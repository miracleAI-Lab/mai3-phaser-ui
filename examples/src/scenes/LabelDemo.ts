import { BaseScene } from "../../../dist";
import { LabelConfig, PanelConfig } from "../../../dist/types";
export class LabelDemo extends BaseScene {

  constructor() {
    super('LabelDemo');
  }

  preload() {
    super.preload();
  }

  create() {
    this.createLabels();
  }

  private createLabels() {
    this.createTransparentLabel();
    this.createColoredLabel();
    this.createPureTextLabel();
    this.createRoundedLabel();
    this.createReturnButton();
    this.createPanelLabel();
    this.createPanel();
  }

  private createReturnButton() {
    this.mai3.add.textButton({
      x: 10,
      y: 10,
      width: 150,
      height: 50,
      text: "返回DemoScene",
      backgroundColor: 0x4CAF50,
      borderColor: 0x45A049,
      borderWidth: 2,
      radius: 10,
      textStyle: {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#FFFFFF',
      },
      handleUp: {
        handleFn: () => {
          this.scene.start('DemoScene');
        }
      },
    });
  }

  private createTransparentLabel() {
    this.mai3.add.label({
      x: 10, y: 100,
      width: 200,
      text: "背景透明的文字Label",
      autoHeight: true,
      borderWidth: 4,
      borderColor: 0xFFD700,
      backgroundColor: 0x32CD32,
      backgroundAlpha: 0,
      textStyle: {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#FFD700',
      },
      isWordWrap: true,
      padding: { x: 5, y: 5 },
    });
  }

  private createColoredLabel() {
    const text = `Phaser is a fast free`;
    const cfg = {
      x: 10, y: 200,
      text: text,
      width: 200,
      autoHeight: true,
      isWordWrap: true,
      borderWidth: 4,
      borderColor: 0xFFD700,
      backgroundColor: 0x32CD32,
      backgroundAlpha: 1,
      textStyle: {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#fff',
      },
      padding: { x: 10, y: 10 },
    };
    this.mai3.add.label(cfg);
  }

  private createPanelLabel() {
    const text = `This is Panel Label`;
    const cfg: LabelConfig = {
      x: 10, y: 300,
      text: text,
      width: 200,
      autoHeight: true,
      isWordWrap: true,
      texture: 'StartGameButton',
      borderWidth: 4,
      borderColor: 0xFFD700,
      backgroundColor: 0x32CD32,
      backgroundAlpha: 1,
      textStyle: {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#fff',
      },
      padding: { x: 10, y: 10 },
    };
    this.mai3.add.label(cfg);
  }

  private createPanel() {
    const cfg: PanelConfig = {
      x: 10, y: 400,
      width: 800,
      height: 100,
      texture: 'mainMenuBg',
      padding: { x: 10, y: 10 },
    };
    const panel = this.mai3.add.panel(cfg);
    panel.render();
  }

  private createPureTextLabel() {
    const textCfg = {
      x: 300, y: 100,
      text: '这是一个纯文本的text组件',
      width: 300,
      autoHeight: true,
      isWordWrap: true,
      textStyle: {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#fff',
      },
      padding: { x: 5, y: 5 },
    };
    const text = this.mai3.add.text(textCfg);
    text.enableDrag();
    text.debugHitArea();
  }

  private createRoundedLabel() {
    const text = `Phaser is a fast free, and fun open source HTML5 game framework`;
    const labelCfg = {
      x: 280, y: 200,
      width: 600,
      height: 100,
      text: text,
      borderWidth: 4,
      radius: 20,
      borderColor: 0xFFD700,
      backgroundColor: 0xcf4b00,
      backgroundAlpha: 1,
      textStyle: {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#fff',
      },
      isWordWrap: true,
      padding: { left: 20, right: 20, top: 10, bottom: 0 },
    };
    this.mai3.add.label(labelCfg);
  }

}
