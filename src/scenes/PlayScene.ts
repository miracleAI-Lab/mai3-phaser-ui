
import BaseScene from "../mai3/scene/BaseScene";
// import Sprites from '../game/entities/Sprite';
// import KeyBoard from '../game/entities/KeyBoard';
//import HealthBar from '../game/entities/HealthBar';
// import Player from "../game/entities/Player"
//import { ComputerSprite } from '../game/entities/Computer';
import { PlayerSprite } from '../game/entities/Player';

export class PlayScene extends BaseScene {
    //  public ComputerList?: ComputerSprite[] = [];
    public player?: PlayerSprite;
    //private hb?:HealthBar;
    constructor() {
        super("PlayScene");
    }

    preload() {
    }
    create() {

    }
    update() {

    }
}