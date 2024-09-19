import MaiGame from '../entities/MaiGame';

export class Movement {
    scene: Phaser.Scene
    constructor(scene: Phaser.Scene) {
        this.scene = scene
    }
    down(gameobj: Phaser.GameObjects.Sprite) {
        this.AnimsPlay(gameobj, "down", [0, 1, 2])
    }
    up(gameobj: Phaser.GameObjects.Sprite) {

        this.AnimsPlay(gameobj, "up", [9, 10, 11])
    }
    left(gameobj: Phaser.GameObjects.Sprite) {
        this.AnimsPlay(gameobj, "left", [3, 4, 5])
    }
    right(gameobj: Phaser.GameObjects.Sprite) {
        this.AnimsPlay(gameobj, "right", [6, 7, 8])
    }
    stop(gameobj: any) {
        gameobj.stop()
        // this.scene.anims.remove(gameobj.texture.key + "up");
        // this.scene.anims.remove(gameobj.texture.key + "left");
        // this.scene.anims.remove(gameobj.texture.key + "right");
        // this.scene.anims.remove(gameobj.texture.key + "down");
    }
    AnimsPlay(gameobj: Phaser.GameObjects.Sprite, key: string, frames: number[],) {
        const texture = gameobj.texture;
        const config = this.SetAnimsConifg(texture.key + key, frames, texture.key)
        MaiGame.UI.NewSingleAnimation(this.scene, config)
        gameobj.play(texture.key + key, true)
    }
    SetAnimsConifg(key: string, frames: number[], texture: string) {
        return {
            key: key,
            frames: frames,
            frameRate: 10,
            repeat: -1,
            texture: texture
        }
    }
}
export const NewMovement = (scene: Phaser.Scene) => new Movement(scene)
