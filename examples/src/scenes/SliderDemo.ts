import { BaseScene } from "../../../dist";
export class SliderDemo extends BaseScene {
  constructor() {
    super('SliderDemo');
  }

  preload() {
    super.preload();
  }

  create() {
    this.createSlider();
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

  private createSlider() {
    //无图
    this.mai3.add.slider({
      x: 10,
      y: 250,
      width: 480,
      height: 40,
      radius: 20,
      borderWidth: 4,
      borderColor: 0x00e3e3,
      bgColor: 0xcf4b00,
      fillColor: 0xff8221,
      bgTexture: "",//
      fillTexture: "",//
      handleTexture: "",//
      progressPercent: 0.31,
      min: 0,
      max: 100,
      step: 1,
      handleRadius: 20,
      handleBorderWidth: 6,
      handleBorderColor: 0x933B01,
      handleBackgroundColor: 0xE7C38D,
      handleBackgroundAlpha: 1,
      handleGeomType: "Circle",
    });



    //有一半图
    this.mai3.add.slider({
      x: 10,
      y: 350,
      width: 480,
      height: 40,
      radius: 20,
      borderWidth: 4,
      borderColor: 0x00e3e3,
      bgColor: 0xcf4b00,
      fillColor: 0xff8221,
      bgTexture: "ProgressBg",//
      fillTexture: "ProgressFillBg",//
      handleTexture: "",//
      progressPercent: 0.31,
      min: 0,
      max: 100,
      step: 1,
      handleRadius: 20,
      handleBorderWidth: 6,
      handleBorderColor: 0x933B01,
      handleBackgroundColor: 0xE7C38D,
      handleBackgroundAlpha: 1,
      handleGeomType: "Circle",
    });

    //有一半图
    this.mai3.add.slider({
      x: 10,
      y: 450,
      width: 480,
      height: 40,
      radius: 20,
      borderWidth: 4,
      borderColor: 0x00e3e3,
      bgColor: 0xcf4b00,
      fillColor: 0xff8221,
      bgTexture: "",//
      fillTexture: "",//
      handleTexture: "RoundedButtonFillBg",//
      progressPercent: 0.31,
      min: 0,
      max: 100,
      step: 1,
      handleRadius: 20,
      handleBorderWidth: 6,
      handleBorderColor: 0x933B01,
      handleBackgroundColor: 0xE7C38D,
      handleBackgroundAlpha: 1,
      handleGeomType: "Circle",
    });

    //有全图
    this.mai3.add.slider({
      x: 10,
      y: 550,
      width: 480,
      height: 40,
      radius: 20,
      borderWidth: 4,
      borderColor: 0x00e3e3,
      bgColor: 0xcf4b00,
      fillColor: 0xff8221,
      bgTexture: "ProgressBg",//
      fillTexture: "ProgressFillBg",//
      handleTexture: "RoundedButtonFillBg",//
      progressPercent: 0.31,
      min: 0,
      max: 100,
      step: 1,
      handleRadius: 20,
      handleBorderWidth: 6,
      handleBorderColor: 0x933B01,
      handleBackgroundColor: 0xE7C38D,
      handleBackgroundAlpha: 1,
      handleGeomType: "Circle",
    });

  }

  update() { }
}