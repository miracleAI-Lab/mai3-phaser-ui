import { Container } from './Container';
import { LayoutConfig } from '../types';
import Utils from '../utils';
import BaseScene from '../scene';

export class Layout extends Container {
    private _content: Container;
    private _config: LayoutConfig;
    private _bg?: Phaser.GameObjects.Image | Phaser.GameObjects.RenderTexture;

    constructor(scene: BaseScene, config: LayoutConfig) {
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
        const { width = 200, height = 0, background, borderWidth, radius, borderColor } = this._config;
        const bgHeight = height || (this._content?.RealHeight ?? 0);

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
        );
    }

    public reDraw(config: LayoutConfig): void {
        this.clear();
        this._config = config;
        this.initLayout();
    }

    public clear(): void {
        this._content.removeAll(true);
        this.removeAll(true);
    }

    public addChildren(children: Container[]): void {
        const { width = 0, height = 0, padding = 0, space = 0, horizontalAlign = 'center', verticalAlign = 'top', orientation = 'x' } = this._config;
        const isHorizontal = Utils.isHorizontal(orientation);

        this._config.children = children;

        let nextX = 0;
        let nextY = 0;

        children.forEach(child => {
            child.setPosition(nextX, nextY);
            this._content.addChild(child);

            this._content.RefreshBounds();
            const { RealWidth = 0, RealHeight = 0 } = this._content;
            nextX = isHorizontal ? RealWidth + space : nextX;
            nextY = isHorizontal ? nextY : RealHeight + space;
        });

        this.alignContent(width, height, padding, horizontalAlign, verticalAlign, isHorizontal);
        this.updateBackground();
    }

    private alignContent(width: number, height: number, padding: number, horizontalAlign: string, verticalAlign: string, isHorizontal: boolean): void {
        const { RealWidth = 0, RealHeight = 0 } = this._content;
        const contentHeight = height - padding * 2;

        let contentX = this.calculateContentX(horizontalAlign, RealWidth, width, padding);
        let contentY = this.calculateContentY(verticalAlign, contentHeight, RealHeight, padding);

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
        const { space = 0, verticalAlign } = this._config;

        this._config.children?.forEach(child => {
            if (verticalAlign === 'middle' && isHorizontal) {
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
}
