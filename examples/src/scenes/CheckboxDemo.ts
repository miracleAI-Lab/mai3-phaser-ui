import BaseScene from '../../../src/scene/BaseScene'

export class CheckboxDemo extends BaseScene {
    constructor() {
        super('CheckboxDemo');
    }

    preload() {
        super.preload();
    }

    async create() {
        this.createCheckbox();
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
        }
      });
    }
    
    private createCheckbox() {
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
            },
            handleSelect() {
                console.log('checked: ', this.isChecked);
            }
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