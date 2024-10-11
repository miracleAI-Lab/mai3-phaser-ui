import { BaseScene, Checkbox } from '../../../dist';

export class CheckboxDemo extends BaseScene {
    constructor() {
        super('CheckboxDemo');
    }

    preload() {
        super.preload();
    }

    async create() {
        //有图
        this.createCheckboxWithImages();
        this.createCheckboxGroup();
        this.createMultiSelectCheckboxGroup();
        this.createReturnButton();
    }

    private createReturnButton() {
        this.mai3.add.textButton({
            x: 10,
            y: 40,
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
            x: 10,
            y: 350,
            text: "Mai3333332",
            isChecked: false,
            labelSpace: 10,
            textStyle: {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#fff',
                fontStyle: '',//bold or 100-1200
            },
            handleSelect(ckb: Checkbox) {
                console.log('checked: ', ckb.isChecked);
            },
            iconWidth: 50,
            iconHeight: 50,
            unCheckedTexture: "unChecked",
            checkedTexture: "checked",
        };

        const ckb = this.mai3.add.checkbox(ckbConfig);
        // ckb.debugDrawBorderLine();
        // ckb.debugHitArea();
        // ckb.setEventInteractive();
    }

    private createCheckboxGroup() {
        const checkboxGroup = this.mai3.add.checkboxGroup({
            x: 10,
            y: 500,
            orientation: 'horizontal',
            labelSpace: 10,
            items: [
                { text: '选项1---单选', value: 'option1' },
                { text: '选项2', value: 'option2' },
                { text: '选项3', value: 'option3' }
            ],
            textStyle: {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#fff',
                fontStyle: '',//bold or 100-1200
            },
            iconWidth: 50,
            iconHeight: 50,
            unCheckedTexture: "unChecked",
            checkedTexture: "checked",
        });

        checkboxGroup.on('change', (selectedItems: string[]) => {
            console.log('选中的项目:', selectedItems);
        });
    }

    createMultiSelectCheckboxGroup() {
        const checkboxGroup = this.mai3.add.checkboxGroup({
            x: 10,
            y: 600,
            orientation: 'vertical',
            multiSelect: true,
            labelSpace: 10,
            isCircle: true,
            items: [
                { text: '选项1---多选', value: 'option1' },
                { text: '选项2', value: 'option2' },
                { text: '选项3', value: 'option3' }
            ],
            textStyle: {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#fff',
                fontStyle: '',//bold or 100-1200
            },
            iconWidth: 50,
            iconHeight: 50,
            unCheckedTexture: "rectangle",
            checkedTexture: "circle",
        });

        checkboxGroup.on('change', (selectedItems: string[]) => {
            console.log('选中的项目:', selectedItems);
        });
    }

    update() { }
}