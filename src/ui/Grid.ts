import { Container } from './Container';
import { GridConfig } from '../types';
import Utils from '../utils';
import { BaseScene } from "../game";

export class Grid extends Container {
    private _content: Container;

    config: GridConfig;
    root: Container;
    image?: Phaser.GameObjects.Image;

    constructor(scene: BaseScene, config: GridConfig) {
        super(scene, config);
        this.config = config;
        this.Type = 'Layout';

        const width = config.width ?? 200;
        const height = config.height ?? 300;
        const padding = config.padding ?? 0;
                
        this.root = new Container(scene);
        this.root.width = width;
        this.root.height = height;
        this.addAt(this.root, 1);

        const layoutBg = this.createBg(0, 0, width, height, config);
        this.root.addAt(layoutBg!, 0);

        this._content = new Container(scene, { x: padding });
        this.root.addAt(this._content, 1);
    }

    public addItems(items: Container[]) {
        const cellWidth = this.config.cellWidth ?? 80;
        const cellHeight = this.config.cellHeight ?? 80;

        items.forEach(item => {
            this._content.add(item);
        })
      
        Phaser.Actions.GridAlign(items, {
            width: 3,
            height: 4,
            cellWidth: cellWidth,
            cellHeight: cellHeight,
            x: 0,
            y: 0
        });
    }

    private createBg(
        x: number,
        y: number,
        width: number,
        height: number,
        config: GridConfig) {
        if (typeof config.background === 'string' && !config.background.startsWith('#')) {
            const bg = this.scene.make.image({ x: 0, y, key: config.background });
            bg.setDisplaySize(width, height);
            bg.setOrigin(0);
            return bg;
        }

        const backgroundColor = config.background
            ? ((typeof config.background === 'string' && config.background.startsWith('#')
                ? Utils.hexColorToNumber(config.background) : config.background as number)) : 0x000000;
        
        return Utils.drawRoundedRect(this.scene, x, y,
            width, height, config.borderWidth,
            config.radius, config.borderColor, backgroundColor);
    }
}
