import { CheckboxConfig, RoundedButtonConfig } from '../types';
import { Container } from './Container';
import { BaseScene } from "../game";
import { RoundedButton } from './RoundedButton';
import Memory from '../utils/Memory';
export class Checkbox extends Container {
    private _value?: string;
    public isChecked?: boolean;

    config?: CheckboxConfig;
    label?: Phaser.GameObjects.Text;
    checkmark?: Phaser.GameObjects.Container;

    constructor(scene: BaseScene, config: CheckboxConfig) {
        super(scene, config);
        this.Type = 'Checkbox';
        this.reDraw(config);
    }

    // override
    protected handleDown() {
        super.handleDown();
        this.isChecked = !this.isChecked;
        this.reDrawCheckmark();
        if (this.config?.handleSelect) {
            this.config?.handleSelect(this);
        }
        this.blendMode = 'add';
    }

    public reDraw(config: CheckboxConfig) {
        this.config = config;
        this.isChecked = this.config.isChecked ?? false;
        this.reDrawCheckmark();
        this.reDrawLabel();
        this.RefreshBounds();
    }

    public reDrawLabel() {
        const text = this.config!.text ?? 'MiracleAI';
        const style = this.config!.textStyle ?? {};
        if (!this.label) {
            this.label = this.scene.make.text({ text, style });
        } else {
            this.label.setText(text);
            this.label.setStyle(style);
            this.label.setFontStyle(this.config!.textStyle?.fontStyle!);
        }
        this.aligningCenterBetweenLabelAndCheckMark();
        this.addChild(this.label);
    }

    private aligningCenterBetweenLabelAndCheckMark() {
        const labelSpace = this.config!.labelSpace ?? 10;
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
        if (typeof this.config!.textStyle?.fontSize === 'string') {
            fontSize = Number(this.config!.textStyle?.fontSize.replace('px', ''));
        } else {
            fontSize = this.config!.textStyle?.fontSize ?? 16;
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
        const bgConfig = this.transformForRoundedButtonConfig("bg", this.config!.markBgRadius);
        let bg = this.scene.mai3.add.roundedButton(bgConfig).setName("bg");
        const fillConfig = this.transformForRoundedButtonConfig("fill", this.config!.markFillRadius);
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

    private transformForRoundedButtonConfig(isBgOrFill: string, radius?: number): RoundedButtonConfig {
        this._value = this.config!.value ?? '0';
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
            this.config!.borderWidth = this.config!.markBgBorderWidth;
            markBgRadius = this.config!.markBgRadius;
            borderWidth = this.config!.markBgBorderWidth ?? 4;
            borderColor = this.config!.markBgBorderColor ?? 0xFFD700;
            backgroundColor = this.config!.markBgColor ?? 0xff8221;
            backgroundAlpha = this.config!.markBgAlpha ?? 1;
            texture = this.config!.markBgTexture;
        } else {
            this.config!.borderWidth = this.config!.markFillBorderWidth;
            markFillRadius = this.config!.markFillRadius;
            borderWidth = this.config!.markFillBorderWidth ?? 4;
            borderColor = this.config!.markFillBorderColor ?? 0xFFD700;
            backgroundColor = this.config!.markFillColor ?? 0xff8221;
            backgroundAlpha = this.config!.markFillAlpha ?? 1;
            texture = this.config!.markFillTexture;
            x = (this.config!.markBgRadius! + this.config!.markBgBorderWidth!) - (this.config!.markFillRadius! + this.config!.markFillBorderWidth!);
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
            enablePointer: false,
            enableDrag: false,
        }

        return config;
    }

    set value(v: string) {
        this._value = v;
    }

    get value(): string {
        return this._value ?? '';
    }

    destroy(fromScene?: boolean): void {
        super.destroy(fromScene);
        this.label?.destroy(fromScene);
        this.checkmark?.destroy(fromScene);
    }
}