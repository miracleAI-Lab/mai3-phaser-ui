import { Container } from './Container';
import { DialogBody, DialogConfig, DialogFooter, DialogHeader, LayoutConfig, Mai3Component } from '../types';
import Utils from '../utils';
import { Layout } from './Layout';
import BaseScene from '../scene';
import Memory from '../utils/Memory';

type DialogConfigs = DialogHeader | DialogBody | DialogFooter | DialogConfig | undefined;
export class Dialog extends Container {
    private _header?: Layout;
    private _body?: Layout;
    private _footer?: Layout;

    config?: DialogConfig;
    image?: Phaser.GameObjects.Image;
    root?: Container;

    constructor(scene: BaseScene, config: DialogConfig) {
        let superConf: DialogConfig = {};
        if (config) {
            superConf = Object.assign({}, config);
            superConf.x = 0;
            superConf.y = 0;
        }
        super(scene, superConf);
        this.Type = 'Dialog';
        this.scene = scene;
        this.draw(config);
    }

    draw(config: DialogConfig) {
        let lastConf = this.config;
        this.config = config;
        const width = config.width ?? 200;
        const height = config.height ?? 300;
        const headHeight = config.header?.height ?? 40;
        const footHeight = config.footer?.height ?? 40;
        const padding = config.padding ?? 0;
        const itemWidth = width - padding * 2;

        const bg = this.scene.add.rectangle(0, 0, this.scene.scale.width, this.scene.scale.height, 0x696969, 0.8).setName("bg");
        bg.setOrigin(0, 0);
        this.addAt(bg, 0);

        bg.setInteractive();
        bg.on('pointerdown', this.handlePointerDown);
        Memory.DelEventsBeforeDestory(bg);

        this.root = new Container(this.scene).setName("root");
        this.root.width = width;
        this.root.height = height;
        this.addAt(this.root, 1);

        let _dialogBg = this.createBg(0, 0, width, height, config)?.setName("_dialogBg");
        this.root.addAt(_dialogBg!, 0);

        let headConf: LayoutConfig = {
            x: padding,
            y: padding,
            width: itemWidth,
            height: headHeight,
            padding: config.header?.padding,
            background: config.header?.background,
            orientation: config.header?.orientation,
            radius: config.header?.radius,
            horizontalAlign: config.header?.horizontalAlign,
            verticalAlign: config.header?.verticalAlign,
            children: lastConf?.header?.children
        };
        if (!this._header) {
            this._header = this.scene.mai3.add.layout(headConf).setName("_header");
        } else {
            this._header.reDraw(headConf);
        }
        this.root.addAt(this._header, 1);

        const bodyY = this._header.y + headHeight;
        const bodyHeight = height - headHeight - footHeight;
        let bodyConf: LayoutConfig = {
            x: padding,
            y: bodyY,
            width: itemWidth,
            height: bodyHeight,
            padding: config.body?.padding,
            background: config.body?.background,
            orientation: config.body?.orientation,
            radius: config.body?.radius,
            horizontalAlign: config.body?.horizontalAlign,
            verticalAlign: config.body?.verticalAlign,
            children: lastConf?.body?.children
        };
        if (!this._body) {
            this._body = this.scene.mai3.add.layout(bodyConf).setName("_body");
        } else {
            this._body.reDraw(bodyConf);
        }
        this.root.addAt(this._body, 1);

        const footerY = height - footHeight;
        let footerConf: LayoutConfig = {
            x: padding,
            y: footerY,
            width: itemWidth,
            height: footHeight,
            padding: config.footer?.padding,
            background: config.footer?.background,
            orientation: config.footer?.orientation,
            radius: config.footer?.radius,
            horizontalAlign: config.footer?.horizontalAlign,
            children: lastConf?.footer?.children
        }
        if (!this._footer) {
            this._footer = this.scene.mai3.add.layout(footerConf).setName("_footer");
        } else {
            this._footer.reDraw(footerConf);
        }
        this.root.addAt(this._footer, 1);

        const rootX = (this.scene.scale.width - this.root.width) / 2;
        const rootY = (this.scene.scale.height - this.root.height) / 2;
        this.root.setPosition(rootX, rootY);
        this.setDepth(99999);
        this.RefreshBounds();
    }

    reDraw(config: DialogConfig) {
        this.clear();
        this.draw(config);
    }

    clear() {
        this.root?.remove(this._header!);
        this.root?.remove(this._body!);
        this.root?.remove(this._footer!);
        this.getAll().forEach((obj) => {
            obj.destroy(true);
        });
    }

    public show() {
        this.setVisible(true);
    }

    public hide() {
        this.setVisible(false);
    }

    public close() {
        this.destroy();
    }

    handlePointerDown(_: Phaser.Input.Pointer,
        _localX: number,
        _localY: number,
        event: Phaser.Types.Input.EventData) {
        event.stopPropagation();
    }

    public addBodyItems(children: Container[]) {
        this["config"]!["body"]!["children"] = children;
        this._body?.addChildren(children);
    }

    public addFooterItems(children: Container[]) {
        this["config"]!["footer"]!["children"] = children;
        this._footer?.addChildren(children);
    }

    public printLog() {
        // console.log('body displayHeight: ', this._body?.displayHeight);
        this._header?.debugDrawBorderLine();
        this._body?.debugDrawBorderLine();
        this._footer?.debugDrawBorderLine(0xCD9B1D);
        // console.log(`_footer size: ${this._footer?.RealWidth}, ${this._footer?.RealHeight}`)
    }

    private createBg(
        x: number,
        y: number,
        width: number,
        height: number,
        config?: DialogConfigs) {
        if (typeof config?.background === 'string' && !config?.background.startsWith('#')) {
            const bg = this.scene.make.image({ x: 0, y, key: config.background });
            bg.setDisplaySize(width, height);
            bg.setOrigin(0);
            return bg;
        }

        const backgroundColor = config?.background
            ? ((typeof config?.background === 'string' && config?.background.startsWith('#')
                ? Utils.hexColorToNumber(config?.background) : config?.background as number)) : 0x000000;

        return Utils.drawRoundedRect(this.scene, x, y,
            width, height, config?.borderWidth,
            config?.radius, config?.borderColor, backgroundColor);
    }

    // 会有堆栈溢出问题，暂时未知原因，先注释
    //destroy(fromScene?: boolean): void {
    //    console.warn("destroy clear  ");
    //    this._header?.destroy(fromScene);
    //    this._body?.destroy(fromScene);
    //    this._footer?.destroy(fromScene);
    //    this.image?.destroy(fromScene);
    //    this.root?.destroy(fromScene);
    //    this.destroy(fromScene);
    //}
}
