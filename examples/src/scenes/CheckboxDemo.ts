import { BaseScene } from '../../../dist';

export class CheckboxDemo extends BaseScene {
    constructor() {
        super('CheckboxDemo');
    }

    preload() {
        super.preload();
    }

    async create() {
        //无图
        this.createCheckboxWithNoImages();
        //有图
        this.createCheckboxWithImages();
        this.createCheckboxGroup();
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

    //有图
    private createCheckboxWithImages() {
        const ckbConfig = {
            x: 10, y: 350,
            width: 100,
            height: 40,
            checkColor: 0xFFD700,
            uncheckColor: 0xcf4b00,
            text: "Mai3",
            isChecked: true,
            borderWidth: 6,
            labelSpace: 10,
            textStyle: {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#fff',
                fontStyle: '',//bold or 100-1200
            },
            handleSelect() {
                console.log('checked: ', this.isChecked);
            },
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
        };

        const ckb = this.mai3.add.checkbox(ckbConfig);
        ckb.debugDrawBorderLine();
    }

    //无图
    private createCheckboxWithNoImages() {
        const ckbConfig = {
            x: 10, y: 450,
            width: 100,
            height: 40,
            checkColor: 0xFFD700,
            uncheckColor: 0xcf4b00,
            text: "Mai3",
            isChecked: true,
            borderWidth: 6,
            labelSpace: 10,
            textStyle: {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#fff',
                fontStyle: '',//bold or 100-1200
            },
            handleSelect() {
                console.log('checked: ', this.isChecked);
            },
            markBgRadius: 15,
            markBgBorderWidth: 3,
            markBgBorderColor: 0xff0,
            markBgColor: 0x1f1,
            markBgAlpha: 1,
            markBgTexture: "",

            markFillRadius: 12,
            markFillBorderWidth: 3,
            markFillBorderColor: 0xffeeff,
            markFillColor: 0xff00ff,
            markFillAlpha: 1,
            markFillTexture: "",
        };

        const ckb = this.mai3.add.checkbox(ckbConfig);
        ckb.debugDrawBorderLine();
    }

    private createCheckboxGroup() {
        const checkboxGroup = this.mai3.add.checkboxGroup({
            x: 10,
            y: 650,
            width: 300,
            height: 150,
            orientation: 'vertical',
            items: [
                { text: '选项1', value: 'option1' },
                { text: '选项2', value: 'option2' },
                { text: '选项3', value: 'option3' }
            ],
            textStyle: {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#000000',
            },
            checkColor: 0x00FF00,
            uncheckColor: 0xFF0000,
            borderWidth: 2,
        });

        checkboxGroup.on('change', (selectedItems: string[]) => {
            console.log('选中的项目:', selectedItems);
        });
    }

    update() { }
}