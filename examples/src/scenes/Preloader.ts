import { BaseScene, ProgressBar } from "../../../dist";
import { ProgressConfig } from "../../../dist/types";
export class Preloader extends BaseScene {
    config?: ProgressConfig;
    progressBar1?: ProgressBar;

    nextScene?: string
    constructor() {
        super("Preloader");
    }
    preload() {

        this.loadskill()
        this.add.image(0, 0, "preloader");
        this.load.image('logo', 'assets/images/logo.jpg');
        this.load.image('logo2', 'assets/images/logo2.jpg');
        this.load.image('logo3', 'assets/images/logo3.jpeg');
        this.load.image('logo4', 'assets/images/logo4.jpeg');
        this.load.json('config', 'assets/json/config.json');
        this.load.pack('loadimg', 'assets/json/assetimg.json');
        this.load.pack('loadsprites', 'assets/json/assetsprites.json');

        this.load.image("mainMenuBg", "assets/images/mainMenuBg.png");
        this.load.image('StartGameButton', 'assets/images/StartGameButton.png');
        this.load.image('StartGameButtonDown', 'assets/images/StartGameButtonDown.png');
        this.load.image('StartGameButtonHover', 'assets/images/StartGameButtonHover.png');
        this.load.image('playBtn', 'assets/images/playBtn.png');
        this.load.image('restBtn', 'assets/images/restBtn.png');
        this.load.image('scoreBox', 'assets/images/scoreBox.png');
        this.load.image('cangshu', 'assets/images/cangshu.png');

        this.load.image("avatar", "assets/images/avatar.png");
        this.load.image("energy", "assets/images/energy.png");
        this.load.image("main-bg", "assets/images/main-bg.png");
        this.load.image("main-btn", "assets/images/main-btn.png");
        this.load.image("money", "assets/images/money.png");


        this.load.audio('sfx-hover', 'assets/audio/sfx-hover.wav');
        this.load.audio('sfx-press', 'assets/audio/sfx-press.wav');
        this.load.audio('bgm-game', 'assets/audio/bgm-game.mp3');
        this.load.audio('bgm-main', 'assets/audio/bgm-main.mp3');

        // let progressBar: ProgressBar;
        // this.load.on('filecomplete-json-config', (key: string) => {
        //     if (key === 'config') {
        //         const config = this.cache.json.get('config')
        //         Object.values(config.proloaderscene.items).forEach((item: any) => {
        //             if (item.type === "Image") {
        //                 const img = this.mai3.add.Image(this, {
        //                     key: "logo2",
        //                     id: item.elementId,
        //                     x: item.x,
        //                     y: item.y,
        //                 })
        //                 img.image?.setScale(item.scale)
        //             }

        //             if (item.type === "Progress") {
        //                 const bg = (item.strokeImage ?? "") === "" ? item.bg : item.strokeImage
        //                 const fill = (item.fillTexture ?? "") === "" ? item.fill : item.fillTexture
        //                 this.mai3.add.progressBar(this, {
        //                     x: item.x, y: item.y,
        //                     width: item.widht,
        //                     height: item.height,
        //                     radius: item.radius,
        //                     borderWidth: item.borderWidth,
        //                     borderColor: item.borderColor,
        //                     bg: bg,
        //                     fill: fill,
        //                 });
        //             }
        //         })

        this.nextScene = "scenes11"

        //     }
        // });

        const bg = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x551A8B);
        bg.setOrigin(0, 0);

        this.config = {
            x: 10, y: 100,
            width: 480,
            height: 40,
            radius: 20,
            borderWidth: 0,
            borderColor: 0xcf4b00,
            bg: 0x008B8B,
            fill: 0xff8221,
        };

        this.progressBar1 = this.mai3.add.progressBar(this.config);

        const progressBar2 = this.mai3.add.progressBar({
            x: 10, y: 50,
            // y: progressBar1.getBottom() + 100,
            width: 480,
            height: 40,
            radius: 10,
            borderWidth: 4,
            borderColor: 0xC71585,
            bg: "strokeImage",
            fill: "progressImage",
            // bg: 0x008B8B,
            // fill: 0xff8221,
        });

        this.load.on("progress", async (progress: number) => {
            // await MaiGame.Utils.sleep(1000);
            console.log('progress: ', progress);
            this.progressBar1?.updateProgress(progress);
            progressBar2.updateProgress(progress);
            // progressBar.updateProgress(progress);

            this.add.text(10, 10, "isnafosdansa")

        });
    }

    async create() {
        // await MaiGame.Utils.sleep(1000);

        // // this.config!.width = 200;
        // this.config!.bg = "strokeImage";
        // // this.config!.fill = 0x00ff00;
        // this.config!.fill = "progressImage";
        // this.config!.width = 600;
        // this.config!.height = 30;
        // this.config!.radius = 15;
        // this.progressBar1!.reDraw(this.config);
        // this.progressBar1!.updateProgress(0.9);

        // await MaiGame.Utils.sleep(2000);

        // this.config!.bg = 0x00ff00;
        // this.config!.fill = 0xff8221;
        // // this.config!.fill = "progressImage";
        // // this.config!.width = 600;
        // // this.config!.height = 30;
        // // this.config!.radius = 15;
        // this.progressBar1!.reDraw(this.config);
        // this.progressBar1!.updateProgress(0.6);
        // this.progressBar1?.destroy()

        //this.scene.start('BootScene', { "scene": this.nextScene });
        // this.scene.start('CheckboxScene');
        //this.scene.start('PlayScene');
        // this.scene.start('DialogScene');
        // this.scene.start('DemoScene');
        // this.scene.start('DebugBoundDemo');
        // this.scene.start('DemoScene');
        this.scene.start('DemoScene');
        // this.scene.start('TextFieldScene');
        // this.scene.start('Dialog2Scene');

        //this.scene.start('MyGameScene');
        // this.scene.start('MyGameScene');
        // this.scene.start('VolumeSliderScene');
    }
    loadskill() {
        for (let i = 1; i < 6; i++) {
            this.load.image("blast" + i, "assets/images/skills/blast/" + i + ".png")
        }

        for (let i = 1; i < 20; i++) {
            this.load.image("fire" + i, "assets/images/skills/fire/" + i + ".png")
        }

        for (let i = 1; i < 9; i++) {
            this.load.image("flame" + i, "assets/images/skills/flame/" + i + ".png")
        }

        for (let i = 1; i < 6; i++) {
            this.load.image("light" + i, "assets/images/skills/light/" + i + ".png")
        }

        for (let i = 1; i < 17; i++) {
            this.load.image("thunder" + i, "assets/images/skills/thunder/" + i + ".png")
        }
        for (let i = 1; i < 7; i++) {
            this.load.image("attack" + i, "assets/images/skills/attack/" + i + ".png")
        }

    }
}