import { Container } from './Container';
import { LabelConfig, TextConfig, TextStyle } from '../types';
import Utils from '../utils';
import { BaseScene } from "../game";

const defaultStyle = {
  fontFamily: 'Arial', // 字体
  fontSize: '24px', // 字号
  color: '#fff', // 颜色
};

export class Text extends Container {
  private _width?: number;
  private _height?: number;

  text: Phaser.GameObjects.Text;
  config: TextConfig;

  constructor(scene: BaseScene, config: TextConfig) {
    super(scene, config);
    this.config = config;
    this.Type = 'Text';

    const text = config.text || "Welcome to MiracleAI";
    const style = this.getLabelStyle(config);

    this.text = this.scene.make.text({ text, style });
    this.add(this.text);

    this.reDraw(config);
  }

  public reDraw(config: TextConfig) {
    this.config = config;
    this.computedLabelSize();

    const text = config.text || "Welcome to MiracleAI";
    const style = this.getLabelStyle(config);

    this.text.setText(text);
    this.text.setStyle(style);
    this.text.setFontStyle(config.textStyle?.fontStyle!);
    this.layout();
  }

  private layout() {
    const textAlign = this.config.textAlign ?? 'left';
    if (textAlign === 'left') {
      const labelY = (this._height! - this.text!.displayHeight) / 2;
      this.text!.setPosition(0, labelY);
    }

    if (textAlign === 'center') {
      const labelX = (this._width! - this.text!.displayWidth) / 2;
      const labelY = (this._height! - this.text!.displayHeight) / 2;
      this.text!.setPosition(labelX, labelY);
    }

    if (textAlign === 'right') {
      const labelX = this._width! - this.text!.displayWidth;
      const labelY = (this._height! - this.text!.displayHeight) / 2;
      this.text!.setPosition(labelX, labelY);
    }

    this.computedLabelSize();
    this.RefreshBounds();
  }

  private computedLabelSize() {
    const autoWidth = this.config.autoWidth ? true : (this.config.width ? false : true);
    const autoHeight = this.config.autoWidth ? true : (this.config.height ? false : true);
    this._width = autoWidth ? (this.scene.scale.width - 20) : (this.config.width ?? 150);
    this._width = autoWidth ? this.text.displayWidth : this._width;
    this._height = autoHeight ? this.text.displayHeight : (this.config.height ?? this.text.displayHeight);
  }

  private getLabelStyle(config: LabelConfig) {
    const textStyle = config.textStyle ?? defaultStyle;
    const autoWidth = config.width ? false : true;
    this._width = autoWidth ? (this.scene.scale.width - 20) : (config.width ?? 150);

    const style = Object.assign(textStyle, {
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
    return this.text!.text;
  }

  set Text(text: string) {
    this.config = Utils.MergeRight(this.config, { text }) as TextConfig;
    this.reDraw(this.config);
  }

  setWidth(width: number) {
    this.config = Utils.MergeRight(this.config, { width }) as TextConfig;
    this.reDraw(this.config);
  }

  setStyle(textStyle: TextStyle) {
    this.config = Utils.MergeRight(this.config, { textStyle }) as TextConfig;
    this.reDraw(this.config);
  }
}