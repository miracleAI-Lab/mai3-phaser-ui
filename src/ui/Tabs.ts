import { Image } from './Image';
import { Container } from './Container';
import { TabsConfig } from '../types';
import { LinearLayout } from './LinearLayout';
import { BaseScene } from "../game";
import { Label } from './Label';
import { Text } from './Text';
import { Panel } from './Panel';

export class Tabs extends Container {
    private _items?: LinearLayout;
    private _config: TabsConfig;
    private _root?: Panel;
    public image?: Phaser.GameObjects.Image;

    constructor(scene: BaseScene, config: TabsConfig) {
        super(scene, config);
        this._config = config;
        this.Type = 'Tabs';

        this.createTabItems();
        this.setPosition(0, scene.scale.height - (this._config.height || 0));
    }

    createBg() {
        const tabsWidth = this._config.width || this.scene.scale.width;
        const {
            height = 0,
            texture = '',
        } = this._config!;
        this._root = new Panel(this.scene, { x: 0, y: 0, width: tabsWidth, height, texture });

        this._root.setName("root");
        this._root.drawBackground();
        this.addAt(this._root, 1);
    }

    createTabItems() {
        const children: Container[] = [];
        const itemCount = this._config.items?.length || 0;
        const tabsWidth = this._config.width || this.scene.scale.width;
        const itemWidth = tabsWidth / itemCount;
        const padding = this._config.padding || 0;

        const configHeight = this._config.height || 40;
        const multiple = 0.8;

        this._config.items?.forEach((item, index) => {
            const itemRoot = new Container(this.scene);

            if (this._config.texture) {
                this.createBg()
            } else {
                const background = this.scene.add.rectangle(0, 0, itemWidth, configHeight, this._config.background);
                background.setOrigin(0);
                itemRoot.addAt(background, 0);
            }

            const image = this.scene.add.image(padding, padding, item.texture ?? '');
            image.setOrigin(0);

            // 以高度等比缩放，默认显示0.8倍
            const imgSize = configHeight * multiple - padding * 2;
            image.setDisplaySize(imgSize, imgSize);
            image.x = (itemWidth - imgSize) / 2;
            itemRoot.addAt(image, 1);

            const text = new Label(this.scene, {
                x: 0,
                y: configHeight * multiple - padding,
                width: itemWidth,
                text: item.title,
                textStyle: {
                    color: '#fff', // 颜色
                    fontSize: (configHeight - configHeight * multiple) * multiple + 'px'
                },
                textAlign: 'center',
                backgroundColor: 0,
                borderColor: 0
            });
            itemRoot.addAt(text, 1);

            const hitArea = new Phaser.Geom.Rectangle(0, 0, itemWidth, configHeight);
            itemRoot.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains)
                .on('pointerup', () => this.onTabClick(index));

            children.push(itemRoot);
        });

        this._items = new LinearLayout(this.scene, {
            width: tabsWidth,
            height: this._config.height,
            children: children,
            orientation: 'horizontal',
        });

        this.add(this._items!);

    }

    private onTabClick(index: number) {
        if (this._config.onTabClick) {
            this._config.onTabClick(index);
        }
        this.emit('tabChange', index);
    }

    get config(): TabsConfig {
        return this._config!;
    }
}
