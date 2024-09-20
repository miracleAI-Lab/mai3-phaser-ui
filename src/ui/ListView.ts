import { Container } from './Container';
import { LinearLayout } from './LinearLayout';
import BaseScene from '../scene';
import Utils from '../utils';

export interface ListViewConfig {
    x: number;
    y: number;
    width: number;
    height: number;
    background?: string | number;
    borderWidth?: number;
    borderColor?: number;
    radius?: number;
    padding?: number;
    itemHeight?: number;
    itemSpacing?: number;
}

export class ListView extends Container {
    private _content: LinearLayout;
    private _mask: Phaser.GameObjects.Graphics;
    private _config: ListViewConfig;

    constructor(scene: BaseScene, config: ListViewConfig) {
        super(scene, config);
        this.Type = 'ListView';
        this._config = config;
        this._content = this.scene.mai3.add.linearLayout({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            orientation: 'vertical'
        });
        this._mask = this.scene.make.graphics({});
        this.draw();
    }

    private draw() {
        const { width, height, background, borderWidth, borderColor, radius, padding } = this._config;

        // 创建背景
        const bg = this.createBg(0, 0, width, height, this._config);
        this.addChildAt(bg!, 0);

        // 创建内容容器
        this._content.reDraw({
            x: padding || 0,
            y: padding || 0,
            width: width - (padding || 0) * 2,
            height: height - (padding || 0) * 2,
            orientation: 'vertical'
        });
        this.addChildAt(this._content, 1);

        // 创建遮罩
        this._mask.clear();
        this._mask.fillStyle(0xffffff);
        this._mask.fillRect(this.x, this.y, width, height);
        this._content.setMask(this._mask.createGeometryMask());

        // 设置可交互和可滚动
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
        this.scene.input.setDraggable(this);

        this.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            const newY = Phaser.Math.Clamp(this._content.y + dragY, height - this._content.height, 0);
            this._content.y = newY;
        });
    }

    public addItem(item: Container) {
        // const { itemHeight = 50, itemSpacing = 5 } = this._config;
        // item.height = itemHeight;
        this._content.add(item);
        // this._content.height += itemHeight + itemSpacing;
    }

    private createBg(
        x: number,
        y: number,
        width: number,
        height: number,
        config: ListViewConfig
    ) {
        if (typeof config.background === 'string' && !config.background.startsWith('#')) {
            const bg = this.scene.make.image({ x: 0, y, key: config.background });
            bg.setDisplaySize(width, height);
            bg.setOrigin(0);
            return bg;
        }

        const backgroundColor = config.background
            ? ((typeof config.background === 'string' && config.background.startsWith('#')
                ? Utils.hexColorToNumber(config.background) : config.background as number)) : 0xffffff;

        return Utils.drawRoundedRect(this.scene, x, y,
            width, height, config.borderWidth,
            config.radius, config.borderColor, backgroundColor);
    }
}
