import BaseScene from '../../mai3/scene/BaseScene';
import { SpriteConifg } from './Types';
export class Sprite extends Phaser.Physics.Arcade.Sprite {
    scene: BaseScene;
    config: SpriteConifg;
    constructor(scene: BaseScene, config: SpriteConifg) {
        const x = config.x ?? 0;
        const y = config.y ?? 0;
        const frame = config.frame ?? "";
        const texture = config.texture ?? "";
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.config = config
        this.setScale(config.scale).setOrigin(0, 0)
        scene.physics.add.existing(this)
        scene.add.existing(this);
    }
}
export const NewSprite = (scene: BaseScene, config: SpriteConifg) => {
    return new Sprite(scene, config);
}
