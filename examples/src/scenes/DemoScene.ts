import { BaseScene, GridLayout, ListView } from '../../../dist';
export class DemoScene extends BaseScene {
    private gridLayout!: GridLayout;

    constructor() {
        super('DemoScene');
    }

    preload() {
        super.preload();
    }

    async create() {
        this.createDemoNavigation();
        this.createListViewDemo();
    }

    private createDemoNavigation() {
        this.gridLayout = new GridLayout(this, {
            x: 100,
            y: 100,
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
        });

        this.add.existing(this.gridLayout);

        const demoScenes = [
            { name: 'Toast演示', scene: 'ToastDemo', color: 0x4CAF50 },
            { name: '网格布局演示', scene: 'GridLayoutDemo', color: 0x2196F3 },
            { name: '标签页演示', scene: 'TabsDemo', color: 0xFFC107 },
            { name: '复选框演示', scene: 'CheckboxDemo', color: 0xFF5722 },
            { name: '滑块演示', scene: 'SliderDemo', color: 0x9C27B0 },
            { name: '进度条演示', scene: 'ProgressBarDemo', color: 0x795548 },
            { name: '对话框演示', scene: 'DialogDemo', color: 0x607D8B },
            { name: '标签演示', scene: 'LabelDemo', color: 0x3F51B5 },
            { name: '图像演示', scene: 'ImageDemo', color: 0x009688 },
            { name: '按钮演示', scene: 'ButtonDemo', color: 0xCDDC39 },
            { name: '调整大小演示', scene: 'ResizeDemo', color: 0xFF9800 },
            { name: '文本框演示', scene: 'TextBoxDemo', color: 0x8BC34A },
        ];

        for (let i = 0; i < demoScenes.length; i += 3) {
            const rowButtons = [];
            for (let j = 0; j < 3 && i + j < demoScenes.length; j++) {
                const demo = demoScenes[i + j];
                rowButtons.push({
                    type: 'TextButton',
                    text: demo.name,
                    width: 180,
                    height: 60,
                    textStyle: { fontFamily: 'Arial', fontSize: '20px', color: '#FFFFFF' },
                    backgroundColor: demo.color,
                    borderColor: Phaser.Display.Color.IntegerToColor(demo.color).darken(15).color,
                    borderWidth: 2,
                    radius: 10,
                    columnSpan: 4,
                    handleHover: { audio: "sfx-hover" },
                    handleDown: { audio: "sfx-press" },
                    handleUp: { 
                        handleFn: () => {
                            this.scene.start(demo.scene);
                        }
                    }
                });
            }
            this.gridLayout.addRow(rowButtons);
        }
    }

    private createListViewDemo() {
        const listView = new ListView(this, {
            x: 750,
            y: 500,
            width: 300,
            height: 400,
            background: 0x444444,
            borderWidth: 2,
            borderColor: 0x000000,
            radius: 10,
            padding: 10,
            itemHeight: 50,
            itemSpacing: 5
        });

        this.add.existing(listView);

        for (let i = 1; i <= 20; i++) {
            const item = this.mai3.add.container({
                width: 280,
                height: 50
            });

            const itemBg = this.add.rectangle(0, 0, 280, 50, 0x666666, 1);
            itemBg.setOrigin(0);
            item.add(itemBg);

            const text = this.add.text(10, 15, `列表项 ${i}`, {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#FFFFFF'
            });

            item.add(text);
            listView.addItem(item);
        }
    }
        
    update() { }
}