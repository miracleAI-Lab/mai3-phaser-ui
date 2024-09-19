
import MaiGame from '../game/entities/MaiGame';
import BaseScene from "../mai3/scene/BaseScene";
import { CustomScene } from '../game/entities/Scene';


import SceneTrim from '../game/entities/SceneTrim';
// import { OrientEnum, EnumFn } from '../game/entities/enum';



export class BootScene extends BaseScene {
    scenelist: Record<string, CustomScene> = {};
    sss?: Phaser.GameObjects.Group;
    constructor() {
        super("BootScene");
    }
    preload() {
        // this.loadskill()
        // this.add.image(this.OriginX, this.OriginY, "preloader");
        // //加载游戏资源
        // this.load.json('config', 'assets/json/config.json');
        // this.load.pack('loadimg', 'assets/json/assetimg.json');
        // this.load.pack('loadsprites', 'assets/json/assetsprites.json');
    }

    create(predata: any) {
        const config = this.cache.json.get('config')
        const loadScene = new Set<string>();
        this.data.set("gamebgmusic", config.gamebgmusic)
        config.scenes.forEach((sceneconf: any) => {
            if (!loadScene.has(sceneconf.name)) {
                const newscene = MaiGame.UI.NewScene(sceneconf.name);
                //newscene.data.set("gamebgmusic===?",)
                newscene.sceneconf = sceneconf
                this.scenelist[newscene.name] = newscene
                newscene.SetHandleCreate(() => {
                    this.ShowScene(newscene)
                });
                newscene.SetHandleUpdate(() => {
                    SceneTrim.KeyboardUpdate(newscene)
                    // this.customScene.GetPropertyArray("computerList").forEach((item: any) => {
                    //     const computer = (item as Computer)
                    //     const dx = computer.computerSprites.x - this.customScene.player.playerSprites.x;
                    //     const dy = computer.computerSprites.y - this.customScene.player.playerSprites.y;
                    //     const distance = Math.sqrt(dx * dx + dy * dy);
                    //     if (distance < 150) {
                    //         computer.computerMove!.SetMoveType(0);
                    //         computer.Attack();
                    //     } else {
                    //         computer.computerMove!.SetMoveType(1);
                    //     }
                    // });
                })
                this.scene.add(newscene.name, newscene)
                loadScene.add(newscene.name)
            }
        });
        //this.scene.start(Object.keys(this.scenelist)[0])
        this.scene.start(predata.scene)
    }

    ShowScene(scene: CustomScene) {
        SceneTrim.AddPlayer(scene);
        SceneTrim.AddKeyboard(scene);
        SceneTrim.AddComputers(scene);
        const sceneconf = scene.sceneconf
        if (sceneconf.ui?.length > 0) {
            Object.values(sceneconf.ui).forEach((uiitem: any) => {
                SceneTrim.createUIElement(scene, uiitem)
            });
        }
    }
}