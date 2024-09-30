import { BaseScene } from "../../../dist";
export class ImageDemo extends BaseScene {
  constructor() {
    super('ImageDemo');
  }

  preload() {
    super.preload();
  }

  create() {
    this.createImages();
    this.createReturnButton();
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

  private createImages() {
    this.mai3.add.image({
      x: 10,
      y: 450,
      width: 200,
      height: 100,
      key: "cangshu",
      radius: 10,
      borderWidth: 2,
      borderColor: 0xFFD700,
      backgroundColor: 0x32CD32,
      enableSmoothScaleAnim: true,
    });

    this.mai3.add.image({
      x: 240,
      y: 350,
      width: 150,
      height: 100,
      key: "cangshu",
      isCircle: true,
      radius: 10,
      borderWidth: 2,
      borderColor: 0xFFD700,
      backgroundColor: 0x32CD32,
    });
  }

  update() { }
}