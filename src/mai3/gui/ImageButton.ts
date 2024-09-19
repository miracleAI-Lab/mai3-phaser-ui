import BaseScene from '../scene';
import { Container } from './Container';
import { ImageButtonConfig } from '../types';

export class ImageButton extends Container {
    config: ImageButtonConfig;
    image?: Phaser.GameObjects.Image;

    constructor(scene: BaseScene, config: ImageButtonConfig) {
        config.width = config.width ?? 200;
        config.height = config.height ?? 60;
        super(scene, config, 'ImageButton');
        this.config = config;

        this.reDraw(config);
        this.setEventInteractive();
    }

    reDraw(config: ImageButtonConfig) {
        this.config = config;
        this.config.width = config.width ?? 200;
        this.config.height = config.height ?? 60;

        if (!this.image) this.image = this.scene.make.image({});
        this.image.setTexture(config.texture ?? '', config.frame )
        this.image.setDisplaySize(this.config.width, this.config.height);
        this.image.setOrigin(0);
        this.addChild(this.image!);

        this.RefreshBounds();
    }
}
