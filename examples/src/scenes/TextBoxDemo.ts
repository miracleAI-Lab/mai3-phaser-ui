import { BaseScene } from "../../../dist";
export class TextBoxDemo extends BaseScene {
    constructor() {
        super('TextBoxDemo');
    }

    preload() {
        super.preload();
    }

    async create() {
        this.createTextArea();
        this.createTextBox();
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

    private createTextArea() {
        const textArea = this.mai3.add.textArea({
            x: 520,
            y: 450,
            width: 300,
            height: 200,
            text: '这是一个多行文本输入框示例',
            placeholder: '请输入多行文本...',
            borderWidth: 2,
            borderColor: 0x000000,
            backgroundColor: 0xFFFFFF,
            textStyle: {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#000000',
            },
            padding: { x: 10, y: 10 },
            maxLength: 500,
            isWordWrap: true
        });

        textArea.on('input', (text: string) => {
            console.log('文本输入:', text);
        });

        textArea.on('focus', () => {
            console.log('文本框获得焦点');
        });

        textArea.on('blur', () => {
            console.log('文本框失去焦点');
        });
    }

    private createTextBox() {
        this.mai3.add.textBox({
            x: 320,
            y: 680,
            width: 300,
            height: 60,
            placeholder: '请输入账号...',
            text: "一个文本输入框",
            borderWidth: 4,
            borderColor: 0xFFD700,
            backgroundColor: 0xffffff,
            textStyle: {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#000',
            },
            padding: { x: 10 }
        });
    }

    update() { }
}