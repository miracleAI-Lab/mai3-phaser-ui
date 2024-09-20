import { Container } from './Container';
import { RoundedButtonConfig } from '../types';
import Utils from '../utils';
import BaseScene from '../scene';

export class RoundedButton extends Container {
    config: RoundedButtonConfig;
    bg?: Phaser.GameObjects.Graphics;
    image?: Phaser.GameObjects.Image;
    maskShape?: Phaser.GameObjects.Graphics;

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
        const btnRadius = radius + borderWidth;
        const borderColor = config.borderColor ?? 0xFFD700;
        const backgroundColor = config.backgroundColor ?? 0x32CD32;
        const backgroundAlpha = config.backgroundAlpha ?? 1;

        if (!this.bg) this.bg = this.scene.add.graphics();
        if (!this.maskShape) this.maskShape = this.scene.add.graphics();
        if (!this.image) this.image = this.scene.make.image({});
        this.reDrawBg(this.bg, btnRadius, btnRadius, btnRadius, borderWidth, borderColor, backgroundColor, backgroundAlpha);
        if (config.texture) {
            this.reDrawImage(config.texture, borderWidth, borderWidth, radius * 2, radius * 2);
            const color = 0xffffff;
            this.reDrawShap(radius, color);
        }
        this.RefreshBounds();
    }

    reDrawBg(graphics: Phaser.GameObjects.Graphics, x?: number, y?: number, radius?: number, borderWidth?: number, borderColor?: number, fillColor?: number, backgroundAlpha?: number) {
        this.bg = Utils.reDrawCircle(graphics, x, y, radius, borderWidth, borderColor, fillColor).setAlpha(backgroundAlpha);
        this.image!.setVisible(false);
        this.addChildAt(this.bg, 1);
    }

    reDrawImage(textureKey: string, x: number, y: number, w: number, h: number) {
        this.image?.setTexture(textureKey);
        this.image?.setPosition(x, y);
        this.image?.setDisplaySize(w, h);
        this.image?.setOrigin(0);
        this.image!.setVisible(true);
        this.addChildAt(this.image!, 2);
    }

    reDrawShap(radius: number, fillColor: number) {
        this.maskShape!.clear();
        this.maskShape!.fillStyle(fillColor);
        this.maskShape!.fillCircle(0, 0, radius);
        let mask = this.maskShape!.createGeometryMask();
        this.maskShape!.setVisible(false);
        this.image!.setMask(mask);
        this.addChildAt(this.maskShape!, 0);
        this.updateMaskPos();
    }

    //根据按钮的位置来更新mask的位置但不是重绘
    updateMaskPos() {
        const radius = this.config.radius ?? 0;
        const borderWidth = this.config.borderWidth ?? 0;
        const btnRadius = radius + borderWidth;
        let bgLeftTopPos = Utils.getWorldPosition(this.bg!);
        this.maskShape!.setPosition(bgLeftTopPos.x + btnRadius, bgLeftTopPos.y + btnRadius);
    }
}
