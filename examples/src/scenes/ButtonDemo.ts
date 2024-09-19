import Mai3 from "../../../dist";
import { BaseScene } from "../../../dist";
export class ButtonDemo extends BaseScene {

  constructor() {
    super('ButtonDemo');
  }
  
  preload() {
    super.preload();
  }

  create() {
    this.createButtons();
  }

  private createButtons() {
    this.createReturnButton();
    this.createCloseDialogButton();
    this.createDraggableButton();
    this.createRoundedButton();
    this.createStartGameButton();
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
      }
    });
  }

  private createCloseDialogButton() {
    this.mai3.add.textButton({
      x: 10,
      y: 70,
      width: 200,
      height: 80,
      borderColor: 0x900C3F,
      borderWidth: 3,
      backgroundColor: 0xC70039,
      text: "关闭窗口",
      radius: 20,
      textStyle: {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#FFFFFF',
      },
      handleHover: {
        audio: "sfx-hover",
      },
      handleDown: {
        audio: "sfx-press",
      },
      handleUp: {
        handleFn: () => {
        }
      }
    });
  }

  private createDraggableButton() {
    const btn = this.mai3.add.textButton({
      x: 220,
      y: 70,
      borderColor: 0xFF5733,
      borderWidth: 3,
      backgroundColor: 0xFFC300,
      text: "Mai3（可拖动）",
      radius: 20,
      textStyle: {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#000',
      },
      handleHover: {
        audio: "sfx-hover",
      },
      handleDown: {
        audio: "sfx-press",
        handleFn: () => {
          btn.text = "哈哈你好";
        }
      },
      enableDrag: true
    });
  }

  private createRoundedButton() {
    this.mai3.add.roundedButton({
      x: 430,
      y: 70,
      radius: 100,
      texture: "cangshu",
      borderWidth: 6,
      borderColor: 0xFFD700,
      backgroundColor: 0x32CD32,
      handleHover: {
        audio: "sfx-hover"
      },
      handleDown: {
        audio: "sfx-press",
        handleFn: () => {
        }
      }
    });
  }

  private createStartGameButton() {
    this.mai3.add.imageButton({
      x: 10,
      y: 160,
      width: 160,
      height: 60,
      texture: "StartGameButton",
      borderWidth: 3,
      handleHover: {
        audio: "sfx-hover",
        texture: "StartGameButtonHover",
      },
      handleOut: {
        texture: "StartGameButton",
      },
      handleDown: {
        audio: "sfx-press",
        texture: "StartGameButtonDown",
        handleFn: () => {
          console.log("handleDown");
        }
      },
      handleUp: {
        texture: "StartGameButton",
        handleFn: () => {
          console.log("handleUp");
        }
      }
    });
  }
}
