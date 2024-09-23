import { Container } from './Container';
import { LabelConfig, TextStyle } from '../types';
import Utils from '../utils';
import { BaseScene } from "../game";
import { Panel } from './Panel';

const defaultStyle = {
  fontFamily: 'Arial', // 字体
  fontSize: '24px', // 字号
  color: '#fff', // 颜色
};

export class Label extends Panel {
  private _width?: number;
  private _height?: number;

  private label?: Phaser.GameObjects.Text;
  private config: LabelConfig;

  constructor(scene: BaseScene, config: LabelConfig) {
    super(scene, config);
    this.config = config;
    this.Type = 'Label';

    this.reDraw(config);
  }

  public reDraw(config: LabelConfig) {
    this.config = config;

    this.drawText();
    this.drawBg();
    this.RefreshBounds();
  }

  public drawText() {
    const text = this.config.text ?? "Welcome to MiracleAI";
    const style = this.getLabelStyle(this.config);
    const paddingLeft = this.config.padding?.x ? this.config.padding?.x : (this.config.padding?.left ?? 0);
    const paddingRight = this.config.padding?.x ? this.config.padding?.x : (this.config.padding?.right ?? 0);
    const paddingTop = this.config.padding?.y ? this.config.padding?.y : (this.config.padding?.top ?? 0);

    if (!this.label) {
      this.label = this.scene.make.text({});
      this.addChildAt(this.label!, 1);
    }
    this.label?.setText(text);
    this.label?.setStyle(style);

    this.label?.setFontStyle(this.config.textStyle?.fontStyle!);
    this.computedLabelSize();

    const textAlign = this.config.textAlign ?? 'left';
    if (textAlign === 'left') {
      const labelY = paddingTop ? paddingTop : (this._height! - this.label!.displayHeight) / 2;
      this.label!.setPosition(paddingLeft, labelY);
    }

    if (textAlign === 'center') {
      const labelX = (this._width! - this.label!.displayWidth) / 2;
      const labelY = paddingTop ? paddingTop : (this._height! - this.label!.displayHeight) / 2;
      this.label!.setPosition(labelX, labelY);
    }

    if (textAlign === 'right') {
      const labelX = this._width! - this.label!.displayWidth - paddingRight;
      const labelY = paddingTop ? paddingTop : (this._height! - this.label!.displayHeight) / 2;
      this.label!.setPosition(labelX, labelY);
    }
  }

  private computedLabelSize() {
    const autoWidth = this.config.autoWidth ? true : (this.config.width ? false : true);
    const autoHeight = this.config.autoHeight ? true : (this.config.height ? false : true);
    this._width = autoWidth ? (this.scene.scale.width - 20) : (this.config.width ?? 150);

    const paddingLeft = this.config.padding?.x ? this.config.padding?.x : (this.config.padding?.left ?? 0);
    const paddingRight = this.config.padding?.x ? this.config.padding?.x : (this.config.padding?.right ?? 0);
    const paddingTop = this.config.padding?.y ? this.config.padding?.y : (this.config.padding?.top ?? 0);
    const paddingBottom = this.config.padding?.y ? this.config.padding?.y : (this.config.padding?.bottom ?? 0);

    this._width = autoWidth ? (this.label?.displayWidth ?? this._width) : this._width;
    this._height = autoHeight ? (this.label?.displayHeight ?? 30) : (this.config.height ?? (this.label?.displayHeight ?? 30));
    this._width! += paddingLeft + paddingRight;
    this._height! += paddingTop + paddingBottom;
  }

  private getLabelStyle(config: LabelConfig) {
    const textStyle = config.textStyle ?? defaultStyle;
    const autoWidth = this.config.autoWidth ? true : (this.config.width ? false : true);
    this._width = autoWidth ? (this.scene.scale.width - 20) : (config.width ?? 150);

    const style = Object.assign({}, textStyle, {
      wordWrap: {},
      padding: config.padding,
    });

    let wordWrapWidth = this._width;
    wordWrapWidth = config.padding?.left ? (wordWrapWidth - config.padding.left) : wordWrapWidth;
    wordWrapWidth = config.padding?.right ? (wordWrapWidth - config.padding.right) : wordWrapWidth;
    wordWrapWidth = config.padding?.x ? (this._width - config.padding.x * 2) : wordWrapWidth;

    style.wordWrap = config.isWordWrap ? {
      width: wordWrapWidth !== this._width ? wordWrapWidth : this._width,
      useAdvancedWrap: config.isWordWrap
    } : {};

    return style;
  }

  get Text(): string {
    return this.label!.text;
  }

  set Text(text: string) {
    this.config = Utils.MergeRight(this.config, { text }) as LabelConfig;
    this.reDraw(this.config);
  }

  setWidth(width: number) {
    this.config = Utils.MergeRight(this.config, { width }) as LabelConfig;
    this.reDraw(this.config);
  }

  setStyle(textStyle: TextStyle) {
    this.config = Utils.MergeRight(this.config, { textStyle }) as LabelConfig;
    this.reDraw(this.config);
  }

  get TextWidth(): number {
    return this.label?.displayWidth ?? 0;
  }

  get Label(): Phaser.GameObjects.Text {
    return this.label!;
  }

  destroy(fromScene?: boolean) {
    if (this.label) {
      this.label.destroy();
      this.label = undefined;
    }
    super.destroy(fromScene);
  }
}