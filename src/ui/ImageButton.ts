import { BaseScene } from "../game";
import { Container } from './Container';
import { ImageButtonConfig } from '../types';

export class ImageButton extends Container {
    config: ImageButtonConfig;
    image?: Phaser.GameObjects.NineSlice;

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

        if (!this.image) 
            this.image = this.scene.add.nineslice(0, 0, this.config.texture ?? '', this.config.frame);
        
        this.image?.setTexture(this.config.texture ?? '', this.config.frame);
        this.image?.setDisplaySize(this.config.width, this.config.height);
        this.image?.setOrigin(0);
        this.addChild(this.image!);

        this.RefreshBounds();
    }

    destroy(fromScene?: boolean) {
        if (this.image) {
            this.image.destroy();
            this.image = undefined;
        }
        super.destroy(fromScene);
    }
}
