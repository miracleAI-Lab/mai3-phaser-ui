import { Container } from './Container';
import { DialogBody, DialogConfig, DialogFooter, DialogHeader, LinearLayoutConfig } from '../types';
import Utils from '../utils';
import { LinearLayout } from './LinearLayout';
import { BaseScene } from "../game";

export class Dialog extends Container {
    private _header?: LinearLayout;
    private _body?: LinearLayout;
    private _footer?: LinearLayout;
    private _root?: Container;
    private _config?: DialogConfig;

    constructor(scene: BaseScene, config: DialogConfig) {
        super(scene, { ...config, x: 0, y: 0 });
        this.Type = 'Dialog';
        this.scene = scene;
        this._initDialog(config);
    }

    private _initDialog(config: DialogConfig): void {
        this._config = config;
        this._createBackground();
        this._createRoot();
        this._createDialogParts();
        this._positionDialog();
    }

    private _createBackground(): void {
        const bg = this.scene.add.rectangle(0, 0, this.scene.scale.width, this.scene.scale.height, 0x696969, 0.8).setName("bg");
        bg.setOrigin(0, 0).setInteractive().on('pointerdown', this._handlePointerDown);
        this.addAt(bg, 0);
    }

    private _createRoot(): void {
        this._root = new Container(this.scene).setName("root");
        this._root.width = this._config?.width ?? 200;
        this._root.height = this._config?.height ?? 300;
        this.addAt(this._root, 1);

        const dialogBg = this._createDialogBackground();
        this._root.addAt(dialogBg!, 0);
    }

    private _createDialogParts(): void {
        const { width, height, padding = 0 } = this._config!;
        const headHeight = this._config?.header?.height ?? 40;
        const footHeight = this._config?.footer?.height ?? 40;
        const itemWidth = width! - padding * 2;

        this._header = this._createPart("header", padding, padding, itemWidth, headHeight);
        this._body = this._createPart("body", padding, headHeight + padding, itemWidth, height! - headHeight - footHeight);
        this._footer = this._createPart("footer", padding, height! - footHeight, itemWidth, footHeight);
    }

    private _createPart(name: "header" | "body" | "footer", x: number, y: number, width: number, height: number): LinearLayout {
        const conf: LinearLayoutConfig = {
            x, y, width, height,
            padding: this._config?.[name]?.padding,
            background: this._config?.[name]?.background,
            orientation: this._config?.[name]?.orientation,
            radius: this._config?.[name]?.radius,
            alignment: this._config?.[name]?.alignment,
            children: this._config?.[name]?.children
        };

        const part = new LinearLayout(this.scene, conf).setName(`_${name}`);
        this._root!.addAt(part, 1);
        return part;
    }

    private _positionDialog(): void {
        const rootX = (this.scene.scale.width - this._root!.width) / 2;
        const rootY = (this.scene.scale.height - this._root!.height) / 2;
        this._root!.setPosition(rootX, rootY);
        this.setDepth(99999);
        this.RefreshBounds();
    }

    public reDraw(config: DialogConfig): void {
        this.clear();
        this._initDialog(config);
    }

    public clear(): void {
        [this._header, this._body, this._footer].forEach(part => this._root?.remove(part!));
        this.getAll().forEach(obj => obj.destroy(true));
    }

    public show(): void {
        this.setVisible(true);
    }

    public hide(): void {
        this.setVisible(false);
    }

    public close(): void {
        this.destroy();
    }

    private _handlePointerDown = (_: Phaser.Input.Pointer, _localX: number, _localY: number, event: Phaser.Types.Input.EventData): void => {
        event.stopPropagation();
    }

    public addBodyItems(children: Container[]): void {
        this._config!.body!.children = children;
        this._body?.addChildren(children);
    }

    public addFooterItems(children: Container[]): void {
        this._config!.footer!.children = children;
        this._footer?.addChildren(children);
    }

    private _createDialogBackground(): Phaser.GameObjects.GameObject {
        const { width, height } = this._config!;

        if (typeof this._config?.background === 'string' && !this._config.background.startsWith('#')) {
            return this._createImageBackground(width!, height!);
        }

        return this._createRectBackground(width!, height!);
    }

    private _createImageBackground(width: number, height: number): Phaser.GameObjects.Image {
        const bg = this.scene.make.image({ x: 0, y: 0, key: this._config!.background as string });
        bg.setDisplaySize(width, height);
        bg.setOrigin(0);
        return bg;
    }

    private _createRectBackground(width: number, height: number): Phaser.GameObjects.GameObject {
        const backgroundColor = this._config?.background
            ? ((typeof this._config.background === 'string' && this._config.background.startsWith('#')
                ? Utils.hexColorToNumber(this._config.background) : this._config.background as number)) : 0x000000;

        return Utils.drawRoundedRectRenderTexture(this.scene, 0, 0,
            width, height, this._config?.borderWidth,
            this._config?.radius, this._config?.borderColor, backgroundColor) as Phaser.GameObjects.GameObject;
    }

    get config(): DialogConfig {
        return this._config!;
    }

    destroy(fromScene?: boolean): void {
        super.destroy(fromScene);
        this._header?.destroy(fromScene);
        this._body?.destroy(fromScene);
        this._footer?.destroy(fromScene);
        // this.image?.destroy(fromScene);
        // this.root?.destroy(fromScene);
    }
}
