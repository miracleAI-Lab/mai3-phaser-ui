import { BaseScene, GridLayout } from "../../../dist";
export class GridLayoutDemo extends BaseScene {
    constructor() {
        super('GridLayoutDemo');
    }

    preload() {
        super.preload();
    }

    async create() {
        this.createExampleGridLayout(this);
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

    // 示例使用
    private createExampleGridLayout(scene: BaseScene): GridLayout {
        const gridLayout = new GridLayout(scene, {
            x: 200,
            y: 750,
            width: 600,
            height: 400,
            padding: 10,
            rowGap: 10,
            columnGap: 10,
            background: 0x333333,
            borderWidth: 2,
            borderColor: 0x000000,
            alignment: {horizontal: 'center', vertical: 'middle'},
            radius: 10,
            showGrid: true
        });

        scene.add.existing(gridLayout);

        // 第一行
        gridLayout.addRow([
            {
                type: 'TextButton',
                text: '主按钮',
                width: 100,
                height: 60,
                textStyle: { fontFamily: 'Arial', fontSize: '24px', color: '#FFFFFF' },
                backgroundColor: 0x4CAF50,
                borderColor: 0x45A049,
                borderWidth: 2,
                radius: 10,
                columnSpan: 12,
                horizontalAlign: 'left',
                verticalAlign: 'top',
                handleHover: { audio: "sfx-hover" },
                handleDown: { audio: "sfx-press" },
                handleUp: { handleFn: () => console.log('主按钮被点击') }
            }
        ]);

        // 第二行
        gridLayout.addRow([
            {
                type: 'TextBox',
                text: '用户名',
                height: 50,
                textStyle: { fontFamily: 'Arial', fontSize: '18px', color: '#000000' },
                backgroundColor: 0xFFFFFF,
                borderColor: 0x000000,
                borderWidth: 2,
                placeholder: '请输入用户名...',
                columnSpan: 6,
                horizontalAlign: 'left',
                verticalAlign: 'top'
            },
            {
                type: 'TextBox',
                text: '密码',
                height: 50,
                textStyle: { fontFamily: 'Arial', fontSize: '18px', color: '#000000' },
                backgroundColor: 0xFFFFFF,
                borderColor: 0x000000,
                borderWidth: 2,
                placeholder: '请输入密码...',
                columnSpan: 6,
                horizontalAlign: 'left',
                verticalAlign: 'top',
            }
        ]);

        // 第三行
        gridLayout.addRow([
            {
                type: 'ImageButton',
                texture: 'StartGameButton',
                height: 50,
                columnSpan: 4,
                horizontalAlign: 'center',
                verticalAlign: 'middle',
                handleHover: { audio: "sfx-hover", texture: "StartGameButtonHover" },
                handleOut: { texture: "StartGameButton" },
                handleDown: { audio: "sfx-press", texture: "StartGameButtonDown" },
                handleUp: { handleFn: () => console.log('开始游戏按钮被点击') }
            },
            {
                type: 'RoundedButton',
                radius: 30,
                texture: "cangshu",
                borderWidth: 6,
                borderColor: 0xFFD700,
                backgroundColor: 0x32CD32,
                columnSpan: 4,
                horizontalAlign: 'center',
                verticalAlign: 'middle',
                handleHover: {
                    audio: "sfx-hover"
                },
                handleDown: {
                    audio: "sfx-press",
                    handleFn: () => {
                        // Toggle background alpha
                    }
                }
            },
            {
                type: 'Checkbox',
                text: '记住我',
                textStyle: { fontFamily: 'Arial', fontSize: '16px', color: '#FFFFFF' },
                isChecked: false,
                checkColor: 0xFFD700,
                uncheckColor: 0xcf4b00,
                borderWidth: 2,
                columnSpan: 4,
                horizontalAlign: 'center',
                verticalAlign: 'middle',
                handleSelect: function () { console.log('记住我复选框状态:', this.isChecked); }
            }
        ]);

        return gridLayout;
    }
        
    update() { }
}