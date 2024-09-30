import { CheckboxConfig, RoundedButtonConfig } from "../types";
import { BaseScene } from "../game";
import { RoundedButton } from "./RoundedButton";
import Memory from "../utils/Memory";
import { BaseButton } from "./BaseButton";

export class Checkbox extends BaseButton {
  private _value?: string;
  private _config?: CheckboxConfig;

  public isChecked?: boolean;

  label?: Phaser.GameObjects.Text;
  checkmark?: Phaser.GameObjects.Container;

  constructor(scene: BaseScene, config: CheckboxConfig) {
    super(scene, config);
    this.Type = "Checkbox";
    this.reDraw(config);
  }

  // override
  protected handleDown() {
    super.handleDown();
    this.isChecked = !this.isChecked;
    this.reDrawCheckmark();
    if (this._config?.handleSelect) {
      this._config?.handleSelect(this);
    }
    this.blendMode = "add";
  }

  public reDraw(config: CheckboxConfig) {
    this._config = config;
    this.isChecked = this._config.isChecked ?? false;
    this.reDrawCheckmark();
    this.reDrawLabel();
    this.RefreshBounds();
  }

  public reDrawLabel() {
    const text = this._config!.text ?? "MiracleAI";
    const style = this._config!.textStyle ?? {};
    if (!this.label) {
      this.label = this.scene.make.text({ text, style });
    } else {
      this.label.setText(text);
      this.label.setStyle(style);
      this.label.setFontStyle(this._config!.textStyle?.fontStyle!);
    }
    this.aligningCenterBetweenLabelAndCheckMark();
    this.addChild(this.label);
  }

  private aligningCenterBetweenLabelAndCheckMark() {
    const labelSpace = this._config!.labelSpace ?? 10;
    let checkmarkBounds = this.checkmark!.getBounds();
    let fontSize = this.getLabelFontSize();
    let fill = this.checkmark?.getByName("fill") as RoundedButton;
    if (fill.x > 0) {
      this.label!.x = checkmarkBounds.width + labelSpace;
      this.label!.y = (checkmarkBounds.height - fontSize) / 2;
    } else {
      this.label!.x = fill.x + checkmarkBounds.width + labelSpace;
      this.label!.y = fill.y + (checkmarkBounds.height - fontSize) / 2;
    }
  }

  private getLabelFontSize(): number {
    let fontSize = 16;
    if (typeof this._config!.textStyle?.fontSize === "string") {
      fontSize = Number(this._config!.textStyle?.fontSize.replace("px", ""));
    } else {
      fontSize = this._config!.textStyle?.fontSize ?? 16;
    }
    return fontSize;
  }

  private reDrawCheckmark() {
    if (this.checkmark) {
      this.checkmark.destroy(true);
    }
    this.checkmark = this.drawCheckmark();
    Memory.DelEventsBeforeDestory(this.checkmark);
    this.addChild(this.checkmark!);
    this.updateMaskPos();
  }

  protected drawCheckmark(): Phaser.GameObjects.Container {
    const bgConfig = this.transformForRoundedButtonConfig(
      "bg",
      this._config!.markBgRadius
    );
    let bg = this.scene.mai3.add.roundedButton(bgConfig).setName("bg");
    const fillConfig = this.transformForRoundedButtonConfig(
      "fill",
      this._config!.markFillRadius
    );
    let fill = this.scene.mai3.add.roundedButton(fillConfig).setName("fill");

    fill.setVisible(this.isChecked!);
    let c = this.scene.mai3.add.container({});
    c.add([bg, fill]);
    c.RefreshBounds();
    return c;
  }

  public updateMaskPos() {
    for (let i = 0; i < this.checkmark!.getAll().length; i++) {
      const btn = this.checkmark!.getAll()[i] as RoundedButton;
      btn.updateMaskShapePos();
    }
  }

  private transformForRoundedButtonConfig(
    isBgOrFill: string,
    radius?: number
  ): RoundedButtonConfig {
    this._value = this._config!.value ?? "0";
    let markBgRadius = 0;
    let markFillRadius = 0;
    let borderWidth = 0;
    let borderColor = 0;
    let backgroundColor = 0;
    let backgroundAlpha = 0;
    let texture: string | undefined = "";
    let x = 0;
    let y = 0;
    if (isBgOrFill == "bg") {
      this._config!.borderWidth = this._config!.markBgBorderWidth;
      markBgRadius = this._config!.markBgRadius;
      borderWidth = this._config!.markBgBorderWidth ?? 4;
      borderColor = this._config!.markBgBorderColor ?? 0xffd700;
      backgroundColor = this._config!.markBgColor ?? 0xff8221;
      backgroundAlpha = this._config!.markBgAlpha ?? 1;
      texture = this._config!.markBgTexture;
    } else {
      this._config!.borderWidth = this._config!.markFillBorderWidth;
      markFillRadius = this._config!.markFillRadius;
      borderWidth = this._config!.markFillBorderWidth ?? 4;
      borderColor = this._config!.markFillBorderColor ?? 0xffd700;
      backgroundColor = this._config!.markFillColor ?? 0xff8221;
      backgroundAlpha = this._config!.markFillAlpha ?? 1;
      texture = this._config!.markFillTexture;
      x =
        this._config!.markBgRadius! +
        this._config!.markBgBorderWidth! -
        (this._config!.markFillRadius! + this._config!.markFillBorderWidth!);
      y = x;
    }
    const config: RoundedButtonConfig = {
      x: x,
      y: y,
      radius: radius,
      borderWidth: borderWidth,
      borderColor: borderColor,
      backgroundColor: backgroundColor,
      backgroundAlpha: backgroundAlpha,
      texture: texture,
      geomType: "Circle",
      draggable: false,
    };

    return config;
  }

  set value(v: string) {
    this._value = v;
  }

  get value(): string {
    return this._value ?? "";
  }

  get config(): CheckboxConfig {
    return this._config!;
  }

  destroy(fromScene?: boolean): void {
    super.destroy(fromScene);
    this.label?.destroy(fromScene);
    this.checkmark?.destroy(fromScene);
  }
}
