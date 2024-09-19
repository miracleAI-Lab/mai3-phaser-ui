import { Container } from './Container';
import { RoundedButtonConfig } from '../types';
import Utils from '../utils';
import BaseScene from '../scene';

export class RoundedButton extends Container {
    config: RoundedButtonConfig;
    bg?: Phaser.GameObjects.RenderTexture;
    image?: Phaser.GameObjects.Image;
    shape?: Phaser.GameObjects.Graphics;

    constructor(scene: BaseScene, config: RoundedButtonConfig) {
        config.geomType = 'Circle';
        super(scene, config, 'RoundedButton');
        this.config = config;

        this.reDraw(this.config);
        this.setEventInteractive();
    }

    reDraw(config: RoundedButtonConfig) {
        this.config = config;
        this.updateConfig(config);
        
        const radius = config.radius ?? 0;
        const borderWidth = config.borderWidth ?? 0;
        const borderColor = config.borderColor ?? 0xFFD700;
        const backgroundColor = config.backgroundColor ?? 0x32CD32;
        if (!this.shape) this.shape = this.scene.add.graphics();
        if (!this.image) this.image = this.scene.make.image({});

        if (config.texture) {
            const borderColor = config.borderColor ?? 0xFFD700;
            const backgroundColor = config.backgroundColor ?? 0x32CD32;
            this.bg = Utils.reDrawCircleRenderTexture(this.scene, this.bg, radius + borderWidth, radius + borderWidth, radius + borderWidth, borderWidth, borderColor, backgroundColor).setAlpha(config.backgroundAlpha);

            this.image.setTexture(config.texture);
            this.image.setPosition(borderWidth, borderWidth);
            this.image.setDisplaySize(radius * 2, radius * 2);
            this.image.setOrigin(0);

            this.shape.clear();
            this.shape.fillStyle(0xffffff);
            this.shape.fillCircle(this.x + radius + borderWidth, this.y + radius + borderWidth, radius);
            const mask = this.shape.createGeometryMask();
            this.shape.setVisible(false);
            this.image.setMask(mask);
        } else {
            this.bg = Utils.reDrawCircleRenderTexture(this.scene, this.bg, radius, radius, radius, borderWidth, borderColor, backgroundColor).setAlpha(config.backgroundAlpha);
        }

        this.addChildAt(this.bg, 0);
        this.addChildAt(this.image, 1);
        this.RefreshBounds();
    }
}
