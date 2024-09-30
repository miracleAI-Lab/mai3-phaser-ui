import { BaseScene } from "../../../dist";
export class ToastDemo extends BaseScene {
    constructor() {
        super('ToastDemo');
    }

    preload() {
        super.preload();
    }

    async create() {
        this.createToast();
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

    private createToast() {
        const toast = this.mai3.add.toast({
            x: 400,
            y: 300,
            width: 200,
            height: 60,
            text: '这是一个Toast消息',
            duration: 3000,
            type: 'success',
            textAlign: 'center',
            alignment: {horizontal: 'right', vertical: 'top'},
            animationType: 'slide',
            backgroundColor: 0x008B00,
            textStyle: {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#000000',
            },
            margin: { all: 10 },
        });

        // 创建一个按钮来触发Toast
        this.mai3.add.textButton({
            x: 400,
            y: 400,
            width: 150,
            height: 50,
            text: '显示Toast',
            backgroundColor: 0x4CAF50,
            textStyle: {
                fontFamily: 'Arial',
                fontSize: '16px',
                color: '#FFFFFF',
            },
            handleUp: {
                handleFn: () => {
                    toast.show()
                }
            },
        });
    }

    update() { }
}