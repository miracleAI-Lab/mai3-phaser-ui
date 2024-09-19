import { Container } from './Container';
import Utils from '../utils';
import BaseScene from '../scene';
import { TextButton } from './TextButton';
import { TextBox } from './TextBox';
import { ImageButton } from './ImageButton';
import { RoundedButton } from './RoundedButton';
import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';
import { Label } from './Label';
import { ProgressBar } from './ProgressBar';
import { Slider } from './Slider';
import { VolumeSlider } from './VolumeSlider';
import { GridItem, GridLayoutConfig, LayoutConfig } from '../types';
import { Layout } from './Layout';

export class GridLayout extends Container {
    private _content?: Container;
    private _gridLines?: Phaser.GameObjects.Graphics;

    config?: GridLayoutConfig;
    image?: Phaser.GameObjects.Image;

    constructor(scene: BaseScene, config: GridLayoutConfig) {
        super(scene, config);
        this.scene = scene;
        this.Type = 'GridLayout';
        this.draw(config);
    }

    draw(config: GridLayoutConfig) {
        this.config = config;
        const width = config.width ?? 200;
        const height = config.height ?? 300;
        const padding = config.padding ?? 0;

        const layoutBg = this.createBg(0, 0, width, height, config);
        this.addChildAt(layoutBg!, 0);

        this._content = new Container(this.scene);
        this._content.setPosition(padding, padding);
        this.addChildAt(this._content, 1);

        this.scene.input.enableDebug(this._content);
        this.RefreshBounds();

        if (config.showGrid) {
            this.drawGridLines();
        }
    }

    reDraw(config: GridLayoutConfig) {
        this.clear();
        this.draw(config);
    }

    clear() {
        this._content?.removeAll(false);
        this.getAll().forEach((obj) => {
            obj.destroy();
        });
        if (this._gridLines) {
            this._gridLines.destroy();
            this._gridLines = undefined;
        }
    }

    public addRow(childConfigs: any[]) {
        const { width = 200, padding = 0, columnGap = 0, rowGap = 0 } = this.config!;
        const contentWidth = width - padding * 2;
        const columnWidth = (contentWidth - columnGap * 11) / 12;

        this._content?.RefreshBounds();
        const contentHeight = this._content?.RealHeight ?? 0;
        let currentY = contentHeight > 0 ? contentHeight + rowGap : 0;
        
        console.log('RealHeight: ', this._content?.RealHeight);
        console.log('currentY: ', currentY);

        const rowLayoutConfig: LayoutConfig = {
            x: 0,
            y: currentY,
            width: contentWidth,
            horizontalAlign: this.config?.horizontalAlign,
            verticalAlign: this.config?.verticalAlign,
            padding: 0,
            background: 0x3A5FCD,
            space: columnGap
        };

        const rowLayout = new Layout(this.scene, rowLayoutConfig);
        const children: GridItem[] = [];

        childConfigs.forEach((childConfig) => {
            const columnSpan = childConfig.columnSpan ?? 1;
            const childWidth = columnSpan * columnWidth + (columnSpan - 1) * columnGap;
            const childHeight = childConfig.height ? childConfig.height : (childConfig.radius ?? 30) * 2;
            
            const mergedConfig = {
                ...childConfig,
                width: childWidth,
                height: childHeight,
                x: 0,
                y: 0
            };

            const child = this.createChildFromConfig(mergedConfig);
            children.push(child);
        });

        rowLayout.addChildren(children);
        this._content!.addChild(rowLayout);

        if (this.config!.showGrid) {
            this.drawGridLines();
        }
    }

    private createChildFromConfig(config: any): GridItem {
        let child: GridItem;
        switch (config.type) {
            case 'TextButton':
                child = new TextButton(this.scene, config);
                break;
            case 'TextBox':
                child = new TextBox(this.scene, config);
                break;
            case 'ImageButton':
                child = new ImageButton(this.scene, config);
                break;
            case 'RoundedButton':
                child = new RoundedButton(this.scene, config);
                break;
            case 'Checkbox':
                child = new Checkbox(this.scene, config);
                break;
            case 'CheckboxGroup':
                child = new CheckboxGroup(this.scene, config);
                break;
            case 'Label':
                child = new Label(this.scene, config);
                break;
            case 'ProgressBar':
                child = new ProgressBar(this.scene, config);
                break;
            case 'Slider':
                child = new Slider(this.scene, config);
                break;
            case 'VolumeSlider':
                child = new VolumeSlider(this.scene, config);
                break;
            default:
                child = new TextButton(this.scene, config);
        }
        child.columnSpan = config.columnSpan;
        return child;
    }

    private drawGridLines() {
        if (!this._gridLines) {
            this._gridLines = this.scene.add.graphics();
        } else {
            this._gridLines.clear();
        }
    
        const { width = 200, padding = 0, rowGap = 0, columnGap = 0 } = this.config!;
        const totalRows = Math.ceil(this._content!.height / (this._content!.height + rowGap));
        const cellWidth = (width - padding * 2 - columnGap * 11) / 12;
        const cellHeight = this._content!.height / totalRows;
    
        this._gridLines.lineStyle(1, 0xcccccc, 0.5);
    
        for (let row = 0; row < totalRows; row++) {
            for (let col = 0; col < 12; col++) {
                const x = padding + col * (cellWidth + columnGap);
                const y = padding + row * (cellHeight + rowGap);
                this._gridLines.strokeRect(x, y, cellWidth, cellHeight);
            }
        }
    
        this.add(this._gridLines);
    }

    private createBg(
        x: number,
        y: number,
        width: number,
        height: number,
        config: GridLayoutConfig) {
        if (typeof config.background === 'string' && !config.background.startsWith('#')) {
            const bg = this.scene.make.image({ x: 0, y, key: config.background });
            bg.setDisplaySize(width, height);
            bg.setOrigin(0);
            return bg;
        }

        const backgroundColor = config.background
            ? ((typeof config.background === 'string' && config.background.startsWith('#')
                ? Utils.hexColorToNumber(config.background) : config.background as number)) : 0x000000;

        const rt = Utils.drawRoundedRectRenderTexture(this.scene, x, y,
            width, height, config.borderWidth,
            config.radius, config.borderColor, backgroundColor);

        return rt;
    }
}
