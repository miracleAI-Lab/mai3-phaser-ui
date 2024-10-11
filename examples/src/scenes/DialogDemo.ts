import { BaseScene, Dialog } from '../../../dist'
import { DialogConfig } from "../../../dist/types";

export class DialogDemo extends BaseScene {
    private dialog!: Dialog;

    constructor() {
        super('DialogDemo');
    }

    preload() {
        super.preload();
    }

    async create() {
        this.createDialog();
        this.createReturnButton();
        this.createShowDialogButton();
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

    private createShowDialogButton() {
        this.mai3.add.textButton({
            x: 10,
            y: 70,
            width: 150,
            height: 50,
            text: "显示对话框",
            backgroundColor: 0x2196F3,
            borderColor: 0x1E88E5,
            borderWidth: 2,
            radius: 10,
            textStyle: {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#FFFFFF',
            },
            handleUp: {
                handleFn: () => {
                    this.dialog.show();
                }
            },
        });
    }

    private createDialog() {
        const dialogConfig: DialogConfig = {
            x: 10,
            y: 580,
            width: 580,
            height: 700,
            itemSpace: 20,
            padding: {all: 20},
            texture: 'dialog_bg',
            radius: 20,
            // closeButton: {xxxxx}
        };

        this.dialog = this.mai3.add.dialog(dialogConfig);
        this.dialog.hide();

        const items = this.createDialogItems();
        this.dialog.addItems(items);
    }

    private createDialogItems() {
        const items: any[] = [];

        // 添加标题
        items.push({
            type: 'Label',
            x: 20,
            y: 20,
            text: '我是Dialog',
            textStyle: {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#FFFFFF',
            },
        });

        // 添加文本框
        items.push({
            type: 'TextBox',
            x: 20,
            y: 80,
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
            padding: {all: 10}
        });

        // 添加复选框
        items.push({
            type: 'Checkbox',
            x: 20,
            y: 160,
            width: 30,
            height: 30,
            text: '记住密码',
            textStyle: {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#FFFFFF',
            },
            markBgRadius: 5,
            markFillRadius: 3
        });

        // 添加滑动条
        items.push({
            type: 'Slider',
            x: 20,
            y: 220,
            width: 300,
            height: 30,
            min: 0,
            max: 100,
            value: 50,
        });

        // 添加按钮
        items.push(this.createFooterButtonConfig());
        items.push(this.createFooterCloseButtonConfig());

        return items;
    }

    private createFooterButtonConfig() {
        return {
            type: 'ImageButton',
            x: 20,
            y: 280,
            width: 160,
            height: 60,
            texture: "StartGameButton",
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
                handleFn: () => {
                    this.dialog.hide();
                }
            },
        };
    }

    private createFooterCloseButtonConfig() {
        return {
            type: 'TextButton',
            x: 200,
            y: 280,
            width: 100,
            height: 60,
            borderColor: 0x2f4e59,
            backgroundColor: 0x23fe32,
            text: "关闭窗口",
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
            },
            handleUp: {
                handleFn: () => {
                    this.dialog.hide();
                }
            },
        };
    }

    update() { }
}