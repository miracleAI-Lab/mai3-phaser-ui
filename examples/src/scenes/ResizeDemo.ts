import { BaseScene } from "../../../dist";
export class ResizeDemo extends BaseScene {

  constructor() {
    super('ResizeDemo');
  }

  preload() {
    super.preload();
  }

  create() {
    this.createComponents();
    this.createReturnButton();
  }

  private createReturnButton() {
    const returnButton = this.mai3.add.textButton({
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
      handleDown: {
        handleFn: () => {
          this.switchDragResizeComponent(returnButton);
        }
      },
    });
  }

  private createComponents() {
    const button1 = this.mai3.add.textButton({
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      text: "按钮1",
      textStyle: { fontFamily: 'Arial', fontSize: '24px', color: '#FFFFFF' },
      backgroundColor: 0x4CAF50,
      borderColor: 0x45A049,
      borderWidth: 2,
      radius: 10,
      handleDown: {
        handleFn: () => {
          this.switchDragResizeComponent(button1);
        }
      }
    });

    const button2 = this.mai3.add.textButton({
      x: 100,
      y: 170,
      width: 200,
      height: 50,
      text: "按钮2",
      textStyle: { fontFamily: 'Arial', fontSize: '24px', color: '#FFFFFF' },
      backgroundColor: 0x2196F3,
      borderColor: 0x1E88E5,
      borderWidth: 2,
      radius: 10,
      handleDown: {
        handleFn: () => {
          this.switchDragResizeComponent(button2);
        }
      }
    });

    const button3 = this.mai3.add.roundedButton({
      x: 100,
      y: 240,
      radius: 30,
      texture: "cangshu",
      borderWidth: 6,
      borderColor: 0xFFD700,
      backgroundColor: 0x32CD32,
      columnSpan: 4,
      handleHover: {
        audio: "sfx-hover"
      },
      handleDown: {
        audio: "sfx-press",
        handleFn: () => {
          this.switchDragResizeComponent(button3);
        }
      }
    });

    const image = this.mai3.add.image({
      x: 350,
      y: 100,
      key: 'cangshu',
    });

    const text = this.mai3.add.text({
      x: 350,
      y: 240,
      text: '可调整大小的文本',
      textStyle: {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#FFFFFF',
        backgroundColor: '#FF5733'
      },
      handleDown: {
        handleFn: () => {
          this.switchDragResizeComponent(text);
        }
      },
    });

    const checkbox = this.mai3.add.checkbox({
      x: 600,
      y: 100,
      width: 30,
      height: 30,
      text: '复选框',
      textStyle: { fontFamily: 'Arial', fontSize: '18px', color: '#000000', fontStyle: '' },
      handleDown: {
        handleFn: () => {
          this.switchDragResizeComponent(checkbox);
        }
      },
      // handleSelect: this._handleCheckClick.bind(this),
      markBgRadius: 15,
      markBgBorderWidth: 3,
      markBgBorderColor: 0xff0,
      markBgColor: 0x1f1,
      markBgAlpha: 1,
      markBgTexture: "logo",

      markFillRadius: 12,
      markFillBorderWidth: 3,
      markFillBorderColor: 0xffeeff,
      markFillColor: 0xff00ff,
      markFillAlpha: 1,
      markFillTexture: "logo3",
    });

    const checkboxGroup = this.mai3.add.checkboxGroup({
      x: 600,
      y: 170,
      items: [
        { text: '选项1', value: 'option1' },
        { text: '选项2', value: 'option2' },
        { text: '选项3', value: 'option3' }
      ],
      textStyle: { fontFamily: 'Arial', fontSize: '18px', color: '#000000' },
      handleDown: {
        handleFn: () => {
          this.switchDragResizeComponent(checkboxGroup);
        }
      }
    });

    const label = this.mai3.add.label({
      x: 600,
      y: 280,
      text: '这是一个标签',
      textStyle: {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#000000'
      },
      handleDown: {
        handleFn: () => {
          this.switchDragResizeComponent(label);
        }
      },
    });
    label.setEventInteractive();

    this.addDragResizeComponents([button1, button2, button3, image, text, checkbox, checkboxGroup, label]);
  }
}
