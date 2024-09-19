

import MaiGame from "./MaiGame";
import { Movement } from "./Movement";
//import { OrientEnum } from './enum';
import { DirectionEnum } from "./enum";
import { ComputerMoveConfig } from "./Types"
import { PlayerSprite } from "./Player";
import { ComputerSprite } from "./Computer";

class ComputerMove {
    scene: Phaser.Scene;
    config: ComputerMoveConfig;
    gameobj: ComputerSprite | PlayerSprite;
    originX?: number;
    originY?: number;
    destX?: number;
    destY?: number;
    moveType?: number;
    rotation: number = 1;
    direction?: DirectionEnum;
    movement?: Movement
    constructor(scene: Phaser.Scene, gameobj: ComputerSprite | PlayerSprite, config: ComputerMoveConfig) {
        this.scene = scene;
        this.gameobj = gameobj;
        this.config = config;
        this.originX = this.gameobj?.x;
        this.originY = this.gameobj?.y;

        this.movement = MaiGame.UI.NewMovement(scene)
        const firstdest = this.CreateDest()
        this.destX = firstdest.x;
        this.destY = firstdest.y;
    }

    update(fn: () => void) {
        this.MoveDirection()
        this.MoveAuto()
        this.MoveStop()
        fn?.()
    }

    destroy() {

    }
    MoveDirection() {
        if (Math.abs(this.gameobj?.x! - this.destX!) <= 5) this.gameobj?.setX(this.destX)
        if (Math.abs(this.gameobj?.y! - this.destY!) <= 5) this.gameobj?.setY(this.destY)

        if (this.gameobj?.y! > this.destY!) {
            this.direction = DirectionEnum.Up
            return
        } else if (this.gameobj?.x! > this.destX!) {
            this.direction = DirectionEnum.Left
            return
        }
        if (this.gameobj?.y! < this.destY!) {
            this.direction = DirectionEnum.Down
            return
        } else if (this.gameobj?.x! < this.destX!) {
            this.direction = DirectionEnum.Right
            return
        }
        if (this.gameobj?.y! === this.destY! && this.gameobj?.y! === this.destY!) {
            this.direction = DirectionEnum.Middle
            const newDest = this.CreateDest();
            this.destX = newDest.x;
            this.destY = newDest.y;
            return
        }
    }
    CreateDest(): { x: number, y: number } {
        const x = MaiGame.Utils.getRandomIntSecure(this.originX! - this.config.distance!, this.originX! + this.config.distance!)
        const y = MaiGame.Utils.getRandomIntSecure(this.originY! - this.config.distance!, this.originY! + this.config.distance!)
        return { x: x, y: y }
    }
    MoveAuto() {
        if (this.moveType === 1) {
            if (this.direction === DirectionEnum.Left) {
                this.gameobj?.setVelocity(-100, 0)
                this.movement?.left(this.gameobj!)
            }
            if (this.direction === DirectionEnum.Right) {
                this.gameobj?.setVelocity(100, 0)
                this.movement?.right(this.gameobj!)
            }
            if (this.direction === DirectionEnum.Up) {
                this.gameobj?.setVelocity(0, -100)
                this.movement?.up(this.gameobj!)
            }
            if (this.direction === DirectionEnum.Down) {
                this.gameobj?.setVelocity(0, 100)
                this.movement?.down(this.gameobj!)
            }
            if (this.direction === DirectionEnum.Middle) {
                this.gameobj?.setVelocity(0, 0)
                this.movement?.stop(this.gameobj!)
            }
        }
    }

    MoveStop() {
        if (this.moveType === 0) {
            // this?.gameobj.setVelocity(0);
            this?.gameobj.stop()
        }
    }

    SetMoveType(value: number) {
        this.moveType = value
    }

    // private MoveAnimation(scene: Phaser.Scene, gameobj: Phaser.GameObjects.Sprite, origen: OrientEnum, distance: number, rotation: Number) {
    //     if (origen === OrientEnum.Horizontal) {
    //         if ((distance > 0 && rotation === 1) || (distance < 0 && rotation === 2)) {
    //             Movement.right(scene, gameobj)
    //             this.direction = DirectionEnum.Right
    //         } else if ((distance < 0 && rotation === 1) || (distance > 0 && rotation === 2)) {
    //             Movement.left(scene, gameobj)
    //             this.direction = DirectionEnum.Left
    //         }
    //     } else {
    //         if ((distance > 0 && rotation === 1) || (distance < 0 && rotation === 2)) {
    //             Movement.down(scene, gameobj)
    //             this.direction = DirectionEnum.Down
    //         } else if ((distance > 0 && rotation === 2) || (distance < 0 && rotation === 1)) {
    //             Movement.up(scene, gameobj)
    //             this.direction = DirectionEnum.Up
    //         }
    //     }
    // }

}

export default ComputerMove;