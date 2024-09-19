import BaseScene from "../../../src/scene";

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
        }
      });
    }

    private createSlider() {
        this.mai3.add.slider({
            x: 10,
            y: 250,
            width: 480,
            height: 40,
            radius: 20,
            borderWidth: 4,
            borderColor: 0xcf4b00,
            bg: 0xcf4b00,
            fill: 0xff8221,
            min: 0,
            max: 100,
            step: 1,
        });
    }
        
    update() { }
}