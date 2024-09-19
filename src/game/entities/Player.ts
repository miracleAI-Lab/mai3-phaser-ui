import { DirectionEnum } from "./enum";
import { PlayerConfig } from './Types';
import { CustomScene } from './Scene';
import { Movement } from './Movement';
import { HealthBar } from './HealthBar';
import MaiGame from './MaiGame';

export class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
    scene: CustomScene;
    direction?: DirectionEnum;
    animastats?: boolean = false
    hp?: HealthBar;
    cursors?: any;
    movement?: Movement
    constructor(scene: CustomScene, config: PlayerConfig) {
        super(scene, config.x!, config.y!, config.texture!, 2)
        this.scene = scene
        this.setScale(2)
        this.setOrigin(0, 0)
        scene.physics.add.existing(this)

        this.hp = MaiGame.UI.NewHealthBar(scene, { x: config.x!, y: config.y! - 10, widht: 80, height: 10, value: config.hp })
        this.hp.Draw()

        this.movement = MaiGame.UI.NewMovement(scene)

        scene.add.existing(this)

    }
    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta)
        if (this.IsKey("W", "Up", "up")) {
            this.Up()
            this.direction = DirectionEnum.Up;
        } else if (this.IsKey("S", "Down", "down")) {
            this.Down()
            this.direction = DirectionEnum.Down
        } else if (this.IsKey("A", "Left", "left")) {
            this.Left()
            this.direction = DirectionEnum.Left
        } else if (this.IsKey("D", "Right", "right")) {
            this.Right()
            this.direction = DirectionEnum.Right
        } else {
            this.Stop()
        }

        this.hp?.SetPosition(this.x, this.y - 10)
    }

    destroy() {
        this.destroy()
        this.hp?.destroy()
    }
    Up() {
        this.movement?.up(this!)
        this.setVelocity(0, -200);
    }
    Down() {
        this.movement?.down(this!)
        this.setVelocity(0, 200);
    }
    Left() {
        this.movement?.left(this!)
        this?.setVelocity(-200, 0);
    }
    Right() {
        this.movement?.right(this!)
        this.setVelocity(200, 0);
    }
    Stop() {
        this.stop()
        this.setVelocity(0);
    }

    private IsKey(...keys: string[]): boolean {
        for (const item of keys) {
            if (this.cursors[item]?.isDown || this.scene?.joyStickcursors?.[item]?.isDown) {
                return true
            }
        }
        return false
    }
}
export const NewPlayerSprite = (scene: CustomScene, config: PlayerConfig) => new PlayerSprite(scene, config)
