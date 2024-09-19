import { SkillConifg, AnimationFrame } from "./Types";
import { DirectionEnum } from '../entities/enum';
import MaiGame from '../entities/MaiGame';

class Skill {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    count?: number;
    distance?: number;
    skillsprite
    constructor(scene: Phaser.Scene, config: SkillConifg, gameObj?: Phaser.GameObjects.Sprite, direction?: DirectionEnum) {
        this.x = gameObj?.x
        this.y = gameObj?.y
        this.width = config.width || 100
        this.height = config.height || 100
        this.count = config.count || 0
        this.distance = config.distance || 50

        const frames: AnimationFrame[] = []
        for (let index = 1; index < Number(config.count) + 1; index++) {
            frames.push({ key: String(config.key) + index, frame: 0, duration: 200 })
        }

        this.GetPosition(gameObj!, this.distance, direction!)

        MaiGame.UI.NewMultileAnimation(scene, {
            key: config.key!,
            frames: frames,
            frameRate: 10,
            repeat: 0
        })

        this.skillsprite = scene.physics.add.sprite(Number(this.x), Number(this.y), config.key! + 1, 0).setDisplaySize(this.width, this.height)
        this.skillsprite.play(String(config.key), true)

        this.skillsprite.on("animationcomplete", () => {
            this.skillsprite.destroy()
        })
    }

    GetPosition(GameObj: Phaser.GameObjects.Sprite, distance: number, direction: DirectionEnum) {
        let x: number = 0, y: number = 0
        switch (direction) {
            case DirectionEnum.Up:
                x = GameObj.x + GameObj.width * GameObj.scaleX / 2
                y = GameObj.y - distance
                break;
            case DirectionEnum.Down:
                x = GameObj.x + GameObj.width * GameObj.scaleX / 2
                y = GameObj.y + GameObj.height * GameObj.scaleY + distance
                break;
            case DirectionEnum.Left:
                x = GameObj.x - distance
                y = GameObj.y + GameObj.height * GameObj.scaleY / 2
                break;
            case DirectionEnum.Right:
                x = GameObj.x + GameObj.width * GameObj.scaleX + distance
                y = GameObj.y + GameObj.height * GameObj.scaleY / 2
                break;
        }
        this.x = x
        this.y = y
    }
}

export const NewSkill = (scene: Phaser.Scene, config: SkillConifg, gameObj?: Phaser.GameObjects.Sprite, direction?: DirectionEnum) => new Skill(scene, config, gameObj, direction)

// const Skill = {
//     NewSkill(scene: Phaser.Scene, config: SkillConifg): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
//         const frames: AnimationFrame[] = []
//         for (let index = 1; index < Number(config.count) + 1; index++) {
//             frames.push({ key: String(config.key) + index, frame: 0, duration: 200 })
//         }

//         MaiGame.UI.NewMultileAnimation(scene, {
//             key: config.key!,
//             frames: frames,
//             frameRate: 10,
//             repeat: 0
//         })

//         const skillsprite = scene.physics.add.sprite(Number(config.x), Number(config.y), config.key! + 1, 0).setDisplaySize(config.width, config.height)
//         skillsprite.play(String(config.key), true)

//         skillsprite.on("animationcomplete", () => {
//             skillsprite.destroy()
//         })
//         return skillsprite
//     },

//     GetPosition(GameObj: Phaser.GameObjects.Sprite, distance: number, direction: DirectionEnum): { x: number, y: number } {
//         let x: number = 0, y: number = 0
//         switch (direction) {
//             case DirectionEnum.Up:
//                 x = GameObj.x + GameObj.width * GameObj.scaleX / 2
//                 y = GameObj.y - distance
//                 break;
//             case DirectionEnum.Down:
//                 x = GameObj.x + GameObj.width * GameObj.scaleX / 2
//                 y = GameObj.y + GameObj.height * GameObj.scaleY + distance
//                 break;
//             case DirectionEnum.Left:
//                 x = GameObj.x - distance
//                 y = GameObj.y + GameObj.height * GameObj.scaleY / 2
//                 break;
//             case DirectionEnum.Right:
//                 x = GameObj.x + GameObj.width * GameObj.scaleX + distance
//                 y = GameObj.y + GameObj.height * GameObj.scaleY / 2
//                 break;
//         }
//         return { x: x, y: y }
//     }
// }

// if (sceneElement.skills[keyinputconf[item]].move === true) {
//     customScene.tweens.add({
//         targets: skillObj,
//         x: skillObj.x + 200,
//         duration: 1000
//     })
//     customScene.tweens.add({
//         targets: customScene.player.playerSprites,
//         x: customScene.player.playerSprites.x + 200,
//         duration: 1000
//     })
// }

// export default Skill
