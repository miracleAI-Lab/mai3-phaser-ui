import { AnimationConifg, AnimationFrame } from './Types';


export const NewSingleAnimation = (scene: Phaser.Scene, config: AnimationConifg): void => {
    if (!scene.anims.exists(config.key)) {
        scene.anims.create({
            key: config.key,
            frames: scene.anims.generateFrameNumbers(config.texture as string, { frames: config.frames as number[] }),
            frameRate: 10,
            repeat: config.repeat
        })
    }
}

export const NewMultileAnimation = (scene: Phaser.Scene, config: AnimationConifg): void => {
    if (!scene.anims.exists(config.key)) {
        scene.anims.create({
            key: config.key,
            frames: config.frames as AnimationFrame[],
            frameRate: 10,
            repeat: config.repeat
        })
    }
}

export const NewtTweensAnimation = (scene: Phaser.Scene, targets: any): Phaser.Tweens.Tween => {
    return scene.tweens.add({
        targets: targets,
        y: (targets?.y ?? 0) - 100,
        alpha: 0,
        duration: 2500,
        onComplete: () => {
            targets.destroy()
        }
    })
    // let tweenName = config.id;
    // scene.data.set(tweenName, scene.tweens.add({
    //     targets: targets,
    //     y: targets.y - 100,
    //     alpha: 0,
    //     duration: 2500
    // }))
}



