import { Container } from './Container';
import { TabsConfig } from '../types';
import { LinearLayout } from './LinearLayout';
import BaseScene from '../scene';

export class Tabs extends Container {
    private _items?: LinearLayout;

    config: TabsConfig;
    image?: Phaser.GameObjects.Image;

    constructor(scene: BaseScene, config: TabsConfig) {
        super(scene, config);
        this.config = config;
        this.Type = 'Tabs';

        this.createTabItems();
        this.setPosition(0, scene.scale.height - (this.config.height || 0));
    }

    createTabItems() {
        const children: Container[] = [];
        const itemCount = this.config.items?.length || 0;
        const tabsWidth = this.config.width || this.scene.scale.width;
        const itemWidth = tabsWidth / itemCount;
        const padding = this.config.padding || 0;

        this.config.items?.forEach((item, index) => {
            const itemRoot = this.scene.mai3.make.container({});

            const background = this.scene.add.rectangle(0, 0, itemWidth, this.config.height || 40, this.config.background);
            background.setOrigin(0);
            itemRoot.addAt(background, 0);

            const image = this.scene.add.image(padding, padding, item.texture ?? '');
            image.setOrigin(0);
            image.setDisplaySize(itemWidth - padding * 2, (this.config.height || 40) * 0.6 - padding * 2);
            itemRoot.addAt(image, 1);

            const text = this.scene.mai3.make.label({
                x: padding,
                y: (this.config.height || 40) * 0.6 + padding,
                width: itemWidth - padding * 2,
                height: (this.config.height || 40) * 0.4 - padding * 2,
                text: item.title,
                textAlign: 'center',
            });
            itemRoot.addAt(text, 1);

            const hitArea = new Phaser.Geom.Rectangle(0, 0, itemWidth, this.config.height || 40);
            itemRoot.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains)
                .on('pointerup', () => this.onTabClick(index));

            children.push(itemRoot);
        });

        this._items = this.scene.mai3.make.linearLayout({
            width: tabsWidth,
            height: this.config.height,
            children: children,
            orientation: 'horizontal',
        });

        this.add(this._items!);
    }

    private onTabClick(index: number) {
        if (this.config.onTabClick) {
            this.config.onTabClick(index);
        }
        this.emit('tabChange', index);
    }
}
