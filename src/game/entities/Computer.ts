import { CustomScene } from './Scene';
import { HealthBar } from './HealthBar';
import MaiGame from './MaiGame';
import ComputerMove from "./ComputerMove";
export class ComputerSprite extends Phaser.Physics.Arcade.Sprite {
    hp?: HealthBar;
    scene: CustomScene;
    computerMove?: ComputerMove;
    constructor(scene: CustomScene) {
        super(scene, 200, 200, scene.img, 1) // "fight-e96"
        this.scene = scene;
        this.setScale(2)
        this.setOrigin(0, 0)
        this.scene?.physics.add.existing(this);
        this.scene?.add.existing(this)
        this.hp = MaiGame.UI.NewHealthBar(scene, { x: 0, y: 0, widht: 80, height: 10, value: 100 })
        this.hp.Draw()
        this.computerMove = new ComputerMove(scene, this, { distance: 50 })
        this.computerMove.SetMoveType(1)
    }
    update() {
        if (this.hp?.value! < 50) {
            this.computerMove?.destroy()
            this.hp?.destroy()
            this.destroy()
        } else {
            this.hp?.SetPosition(this.x, this.y - 10)
            this.computerMove?.update(() => { })
        }
    }

}


// export const NewComputerSprite = (scene: CustomScene) => new ComputerSprite(scene)



// export class ComputerSprite extends Phaser.Physics.Arcade.Sprite {
//     hp?: HealthBar;
//     scene: Phaser.Scene;
//     confit: ComputerConfig
//     computerMove?: ComputerMove;

//     constructor(scene: CustomScene, confit: ComputerConfig) {
//         super(scene, confit.x!, confit.y!, confit.texture!, 2)

//         console.log(scene, confit.x!, confit.y!, confit.texture!, 2)

//         this.scene = scene;
//         this.confit = confit
//         this.setScale(2)
//         this.setOrigin(0, 0)
//         scene.physics.add.existing(this)

//         this.hp = MaiGame.UI.NewHealthBar(scene, { x: confit.x, y: confit.y! - 10, widht: 80, height: 10, value: confit.hp })
//         this.computerMove = new ComputerMove(scene, this, { orient: confit.orient, distance: confit.distance })
//         this.computerMove.SetMoveType(1)

//         scene.add.existing(this)

//     }
//     show(scene: CustomScene, config: ComputerConfig) {
//         new ComputerSprite(scene, config)
//     }

//     Update() {
//         this.hp?.SetPosition(this.x, this.y - 10)
//     }

//     destroy() {
//         this.destroy()
//         this.hp?.destroy()
//         this.computerMove?.destroy()
//     }

//     Attack() {
//         //攻击
//         if (this.confit.skill != null) {

//             MaiGame.UI.NewSkill(this.scene, {
//                 key: this.confit.skill.name,
//                 x: 100,
//                 y: 100,
//                 width: 100,
//                 height: 100,
//                 count: this.confit.skill.count,
//                 distance: this.confit.skill.distance
//             }, this, this.computerMove!.direction)

//         }
//     }
// }

// export const NewComputerSprite = (scene: CustomScene, config: ComputerConfig) => new ComputerSprite(scene, config)


// export default class Computer {
//     hp?: HealthBar;
//     scene: Phaser.Scene;
//     confit: ComputerConfig
//     computerMove?: ComputerMove;
//     computerSprites: Phaser.Physics.Arcade.Sprite;

//     constructor(scene: BaseScene, confit: ComputerConfig) {
//         this.scene = scene;
//         this.confit = confit

//         this.hp = MaiGame.UI.NewHealthBar(scene, { x: confit.x, y: confit.y! - 10, widht: 80, height: 10, value: confit.hp })
//         this.hp.Draw()

//         this.computerSprites = MaiGame.UI.NewSprite(scene, {
//             x: confit.x!, y: confit.y!, texture: String(confit.texture), frame: 0, scale: 2
//         })

//         this.computerMove = new ComputerMove(scene, this, { orient: confit.orient, distance: confit.distance })
//         this.computerMove.update(() => {
//             this.hp?.SetPosition(this.computerSprites.x, this.computerSprites.y - 10)
//             if (this.hp?.value! < 50) {
//                 this.destroy()
//             }
//         });

//         this.computerMove.SetMoveType(1)
//     }

//     destroy() {
//         this.computerSprites.destroy()
//         this.hp?.destroy()
//         this.computerMove?.destroy()
//     }

//     Attack() {
//         //攻击
//         if (this.confit.skill != null) {

//             MaiGame.UI.NewSkill(this.scene, {
//                 key: this.confit.skill.name,
//                 x: 100,
//                 y: 100,
//                 width: 100,
//                 height: 100,
//                 count: this.confit.skill.count,
//                 distance: this.confit.skill.distance
//             }, this.computerSprites, this.computerMove!.direction)
//             // const skillConifg: SkillConifg = {
//             //     key: this.confit.skill.name,
//             //     name: this.confit.skill.name,
//             //     x: 100,
//             //     y: 100,
//             //     width: 100,
//             //     height: 100,
//             //     count: this.confit.skill.count,
//             //     distance: this.confit.skill.distance
//             // }

//             // const skillposition = Skill.GetPosition(this.computerSprites, skillConifg.distance!
//             //     , this.computerMove!.direction!)

//             // skillConifg.x = skillposition.x
//             // skillConifg.y = skillposition.y
//             // Skill.NewSkill(this.scene, skillConifg)
//         }
//     }
// }

