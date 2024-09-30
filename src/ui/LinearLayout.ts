import { Container } from './Container';
import { Alignment, LinearLayoutConfig } from '../types';
import Utils from '../utils';
import { BaseScene } from "../game";

export class LinearLayout extends Container {
    private _content: Container;
    private _bg?: Phaser.GameObjects.Image | Phaser.GameObjects.RenderTexture;
    private _config: LinearLayoutConfig;

    constructor(scene: BaseScene, config: LinearLayoutConfig) {
        super(scene, config);
        this.scene = scene;
        this.Type = 'Layout';
        this._config = config;
        this._content = new Container(this.scene, {});
        this.initLayout();
    }

    private initLayout(): void {
        this._bg = this.createBackground();
        this.addChildAt(this._bg, 0);
        this.addChildAt(this._content, 1);

        if (this._config.children && this._config.children.length > 0) {
            this.addChildren(this._config.children);
        }
        this.updateBounds();
    }

    private createBackground(): Phaser.GameObjects.Image | Phaser.GameObjects.RenderTexture {
        const { width = 240, height = 0, background, borderWidth, radius, borderColor } = this._config;
        let bgHeight = height || (this._content?.RealHeight ?? 0);
        if (bgHeight == 0) bgHeight = 200;

        if (typeof background === 'string' && !background.startsWith('#')) {
            const bg = this.scene.make.image({ x: 0, y: 0, key: background });
            bg.setDisplaySize(width, bgHeight);
            bg.setOrigin(0);
            return bg;
        }

        const backgroundColor = background
            ? (typeof background === 'string' && background.startsWith('#')
                ? Utils.hexColorToNumber(background)
                : background as number)
            : 0x000000;

        return Utils.drawRoundedRectRenderTexture(
            this.scene, 0, 0, width, bgHeight, borderWidth, radius, borderColor, backgroundColor
        ) as Phaser.GameObjects.RenderTexture;
    }

    public reDraw(config: LinearLayoutConfig): void {
        this.clear();
        this._config = config;
        this.initLayout();
    }

    public clear(): void {
        this._content.removeAll(true);
        this.removeAll(true);
    }

    public addChildren(children: Container[]): void {
        this._config.children = children;
        const { width = 0, height = 0, padding = 0, space = 0,
            alignment = { horizontal: 'center', vertical: 'top' },
            orientation = 'x'
        } = this._config;
        
        let nextX = 0;
        let nextY = 0;
        const isHorizontal = Utils.isHorizontal(orientation);
        children.forEach(child => {
            child.setPosition(nextX, nextY);
            this._content.addChild(child);

            this._content.RefreshBounds();
            const { RealWidth = 0, RealHeight = 0 } = this._content;
            nextX = isHorizontal ? RealWidth + space : nextX;
            nextY = isHorizontal ? nextY : RealHeight + space;
        });

        this.alignContent(width, height, padding, alignment, isHorizontal);
        this.updateBackground();
    }

    private alignContent(width: number, height: number, padding: number, alignment: Alignment, isHorizontal: boolean): void {
        const { RealWidth = 0, RealHeight = 0 } = this._content;
        const contentHeight = height - padding * 2;

        let contentX = this.calculateContentX(alignment.horizontal, RealWidth, width, padding);
        let contentY = this.calculateContentY(alignment.vertical, contentHeight, RealHeight, padding);

        this.repositionChildren(isHorizontal, RealHeight);

        this._content.setPosition(contentX, contentY);
    }

    private calculateContentX(align: string, realWidth: number, totalWidth: number, padding: number): number {
        switch (align) {
            case 'left': return padding;
            case 'center': return (totalWidth - realWidth) / 2;
            case 'right': return totalWidth - padding - realWidth;
            default: return 0;
        }
    }

    private calculateContentY(align: string, totalHeight: number, contentHeight: number, padding: number): number {
        switch (align) {
            case 'bottom': return Math.max(totalHeight - padding - contentHeight, contentHeight - padding);
            case 'middle': return Math.max((totalHeight - contentHeight) / 2, 0);
            default: return padding;
        }
    }

    private repositionChildren(isHorizontal: boolean, contentHeight: number): void {
        let nextX = 0;
        let nextY = 0;
        const { space = 0, alignment } = this._config;

        this._config.children?.forEach(child => {
            if (alignment?.vertical === 'middle' && isHorizontal) {
                nextY = (contentHeight - (child as Container).RealHeight) / 2;
            }
            
            (child as Container).setPosition(nextX, nextY);
            nextX = isHorizontal ? nextX + (child as Container).RealWidth + space : nextX;
            nextY = isHorizontal ? nextY : nextY + (child as Container).RealHeight + space;
        });
    }

    private updateBackground(): void {
        this._bg?.destroy();
        this._bg = this.createBackground();
        this.addChildAt(this._bg, 0);
    }

    private updateBounds(): void {
        this._content.RefreshBounds();
        this.scene.input.enableDebug(this._content);
        this.RefreshBounds();
    }

    get config(): LinearLayoutConfig {
        return this._config!;
    }
}
