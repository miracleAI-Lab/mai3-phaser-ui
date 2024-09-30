import { Container } from './Container';
import { TabsConfig } from '../types';
import { LinearLayout } from './LinearLayout';
import { BaseScene } from "../game";
import { Label } from './Label';

export class Tabs extends Container {
    private _items?: LinearLayout;
    private _config: TabsConfig;
    public image?: Phaser.GameObjects.Image;

    constructor(scene: BaseScene, config: TabsConfig) {
        super(scene, config);
        this._config = config;
        this.Type = 'Tabs';

        this.createTabItems();
        this.setPosition(0, scene.scale.height - (this._config.height || 0));
    }

    createTabItems() {
        const children: Container[] = [];
        const itemCount = this._config.items?.length || 0;
        const tabsWidth = this._config.width || this.scene.scale.width;
        const itemWidth = tabsWidth / itemCount;
        const padding = this._config.padding || 0;

        this._config.items?.forEach((item, index) => {
            const itemRoot = new Container(this.scene);

            const background = this.scene.add.rectangle(0, 0, itemWidth, this._config.height || 40, this._config.background);
            background.setOrigin(0);
            itemRoot.addAt(background, 0);

            const image = this.scene.add.image(padding, padding, item.texture ?? '');
            image.setOrigin(0);
            image.setDisplaySize(itemWidth - padding * 2, (this._config.height || 40) * 0.6 - padding * 2);
            itemRoot.addAt(image, 1);

            const text = new Label(this.scene, {
                x: padding,
                y: (this._config.height || 40) * 0.6 + padding,
                width: itemWidth - padding * 2,
                height: (this._config.height || 40) * 0.4 - padding * 2,
                text: item.title,
                textAlign: 'center',
            });
            itemRoot.addAt(text, 1);

            const hitArea = new Phaser.Geom.Rectangle(0, 0, itemWidth, this._config.height || 40);
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
