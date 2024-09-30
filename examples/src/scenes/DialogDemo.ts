import { BaseScene, Dialog } from '../../../dist'
import { DialogBody, DialogFooter, DialogHeader, Mai3Component } from "../../../dist/types";

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
        this.dialog = this.mai3.add.dialog({
            x: 10,
            y: 580,
            width: 580,
            height: 700,
            itemSpace: 20,
            padding: 0,
            background: '#D3D3D3',
            radius: 20,
            header: this.createDialogHeader(),
            body: this.createDialogBody(),
            footer: this.createDialogFooter(),
        });
        this.dialog.hide();

        const footerItems = this.createFooterItems();
        const bodyItems = this.createBodyItems();
        this.dialog.addFooterItems(footerItems as Mai3Component[]);
        this.dialog.addBodyItems(bodyItems);
    }

    private createDialogHeader(): DialogHeader {
        return {
            height: 60,
            title: '我是Dialog',
            background: '#000080',
            alignment: { horizontal: 'left', vertical: 'top' },
            orientation: 'vertical',
        };
    }

    private createDialogBody(): DialogBody {
        return {
            background: '#104E8B',
            alignment: { horizontal: 'left', vertical: 'top' },
            orientation: 'vertical',
            padding: 20,
            children: []
        };
    }

    private createDialogFooter(): DialogFooter {
        return {
            height: 80,
            background: '#FF1493',
            alignment: { horizontal: 'left', vertical: 'top' },
            orientation: 'horizontal',
            padding: 5,
            children: [],
        };
    }

    private createFooterItems() {
        const footerBtn = this.createFooterButton();
        const footerBtn1 = this.createFooterCloseButton();
        return [footerBtn, footerBtn1];
    }

    private createFooterButton() {
        const footerBtn = this.mai3.make.imageButton({
            id: 'footerBtn',
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
        });
        footerBtn.debugHitArea();
        return footerBtn;
    }

    private createFooterCloseButton() {
        const footerBtn1 = this.mai3.make.textButton({
            id: 'footerBtn1',
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
        });
        footerBtn1.debugHitArea();
        return footerBtn1;
    }

    private createBodyItems() {
        const textBox = this.mai3.make.textBox({
            width: 300,
            height: 60,
            placeholder: '请输入账号...',
            text: "一个文本输入框半成品",
            borderWidth: 4,
            borderColor: 0xFFD700,
            backgroundColor: 0xffffff,
            textStyle: {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#000',
            },
            padding: {}
        });

        return [textBox];
    }

    update() { }
}