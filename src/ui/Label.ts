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
  protected _config: LabelConfig;

  constructor(scene: BaseScene, config: LabelConfig) {
    const padding = Utils.getPadding(config.padding);
    const width = padding.left + padding.right + (config.width ?? 0);
    const height = padding.top + padding.bottom + (config.height ?? 0);

    super(scene, { ...config, width, height});
    this._config = config;
    this.Type = 'Label';

    this.reDraw(config);
  }

  public reDraw(config: LabelConfig) {
    this._config = config;

    this.drawText();
    this.drawBackground();
    this.RefreshBounds();
    this.updateConfig(config);
  }

  public drawText() {
    const text = this._config.text ?? "Welcome to MiracleAI";
    const style = this.getLabelStyle(this._config);
    const padding = Utils.getPadding(this._config.padding);

    if (!this.label) {
      this.label = this.scene.make.text({});
      this.addChildAt(this.label!, 1);
    }
    this.label?.setText(text);
    this.label?.setStyle(style);

    this.label?.setFontStyle(this._config.textStyle?.fontStyle!);
    this.computedLabelSize();

    const textAlign = this._config.textAlign ?? 'left';
    if (textAlign === 'left') {
      const labelY = padding.top ? padding.top : (this._height! - this.label!.displayHeight) / 2;
      this.label!.setPosition(padding.left, labelY);
    }

    if (textAlign === 'center') {
      const labelX = (this._width! - this.label!.displayWidth) / 2;
      const labelY = padding.top ? padding.top : (this._height! - this.label!.displayHeight) / 2;
      this.label!.setPosition(labelX, labelY);
    }

    if (textAlign === 'right') {
      const labelX = this._width! - this.label!.displayWidth - padding.right;
      const labelY = padding.top ? padding.top : (this._height! - this.label!.displayHeight) / 2;
      this.label!.setPosition(labelX, labelY);
    }
  }

  private computedLabelSize() {
    const autoWidth = this._config.autoWidth ? true : (this._config.width ? false : true);
    const autoHeight = this._config.autoHeight ? true : (this._config.height ? false : true);
    this._width = autoWidth ? (this.scene.scale.width - 20) : (this._config.width ?? 150);

    const padding = Utils.getPadding(this._config.padding);
    this._width = autoWidth ? (this.label?.displayWidth ?? this._width) : this._width;
    this._height = autoHeight ? (this.label?.displayHeight ?? 30) : (this._config.height ?? (this.label?.displayHeight ?? 30));
    this._width! += padding.left + padding.right;
    this._height! += padding.top + padding.bottom;
    this._config.width = this._width;
    this._config.height = this._height;
  }

  private getLabelStyle(config: LabelConfig) {
    const textStyle = config.textStyle ?? defaultStyle;
    const autoWidth = this._config.autoWidth ? true : (this._config.width ? false : true);
    this._width = autoWidth ? (this.scene.scale.width - 20) : (config.width ?? 150);
    
    const padding = Utils.getPadding(this._config.padding);
    const style = Object.assign({}, textStyle, {
      wordWrap: {},
      padding: padding,
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
    this._config = Utils.MergeRight(this._config, { text }) as LabelConfig;
    this.reDraw(this._config);
  }

  setWidth(width: number) {
    this._config = Utils.MergeRight(this._config, { width }) as LabelConfig;
    this.reDraw(this._config);
  }

  setStyle(textStyle: TextStyle) {
    this._config = Utils.MergeRight(this._config, { textStyle }) as LabelConfig;
    this.reDraw(this._config);
  }

  get TextWidth(): number {
    return this.label?.displayWidth ?? 0;
  }

  get Label(): Phaser.GameObjects.Text {
    return this.label!;
  }

  get config(): LabelConfig {
    return this._config!;
  }

  destroy(fromScene?: boolean) {
    if (this.label) {
      this.label.destroy();
      this.label = undefined;
    }
    super.destroy(fromScene);
  }
}