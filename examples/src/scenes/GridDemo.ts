import { BaseScene, Grid } from '../../../dist';
import { ImageConfig } from '../../../dist/types';
export class GridDemo extends BaseScene {
    private grid!: Grid;

    constructor() {
        super('GridDemo');
    }

    preload() {
        super.preload();
    }

    async create() {
        this.createDemoNavigation();
        this.createReturnButton();
    }

    private createDemoNavigation() {
        this.grid = new Grid(this, {
            x: 100,
            y: 100,
            width: 600,
            height: 400,
            padding: { all: 20 },
            rowGap: 10,
            columnGap: 10,
            rows: 4,
            columns: 3,
            // autoFill: true,
            draggable: true,
            borderWidth: 6,
            borderColor: 0xCD8500,
            backgroundColor: 0x000000,
            alignment: { horizontal: 'center', vertical: 'middle' },
            radius: 10,
        });

        this.add.existing(this.grid);

        const demoScenes = [
            { name: 'Drag Me 1', scene: 'ToastDemo', color: 0x4CAF50 },
            { name: 'Drag Me 2', scene: 'GridDemo', color: 0x2196F3 },
            { name: 'Drag Me 3', scene: 'TabsDemo', color: 0xFFC107 },
            { name: 'Drag Me 4', scene: 'CheckboxDemo', color: 0xFF5722 },
            { name: 'button5', scene: 'SliderDemo', color: 0x9C27B0 },
            { name: 'button6', scene: 'ProgressBarDemo', color: 0x795548 },
            { name: 'button7', scene: 'DialogDemo', color: 0x607D8B },
            { name: 'button8', scene: 'LabelDemo', color: 0x3F51B5 },
            { name: 'button9', scene: 'ImageDemo', color: 0x009688 },
        ];

        const rowButtons = [];
        for (let i = 0; i < demoScenes.length; i++) {
            const demo = demoScenes[i];
            const cellItems = [];
            cellItems.push({
                width: 150,
                height: 60,
                type: 'TextButton',
                text: demo.name,
                draggable: true,
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
                        // this.scene.start(demo.scene);
                    }
                }
            });

            cellItems.push({
                x: 140,
                y: 10,
                width: 40,
                height: 40,
                type: 'Image',
                key: "cangshu",
                draggable: false,
            })

            rowButtons.push(cellItems);
        }

        this.grid.addCellItems(rowButtons);

        this.grid.addItems([
            {
                type: 'TextButton',
                text: 'Button 10',
                width: 150,
                height: 60,
                textStyle: { fontFamily: 'Arial', fontSize: '20px', color: '#FFFFFF' },
                backgroundColor: 0xFFC107,
                borderColor: Phaser.Display.Color.IntegerToColor(0xFF5722).darken(15).color,
                borderWidth: 2,
                radius: 10,
                columnSpan: 4,
                handleHover: { audio: "sfx-hover" },
                handleDown: { audio: "sfx-press" },
                handleUp: {
                    handleFn: () => {
                        // this.scene.start(demo.scene);
                    }
                }
            }
        ]);
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
            enablePointer: true,
        });
    }

    update() { }
}