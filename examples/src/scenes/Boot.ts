import { BaseScene } from '../../../dist';

export class Boot extends BaseScene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.image('logo', 'assets/images/logo.jpg');
        this.load.image('logo2', 'assets/images/logo2.jpg');
        this.load.image('logo3', 'assets/images/logo3.jpeg');
        this.load.image('logo4', 'assets/images/logo4.jpeg');
        // this.load.image("preloader", "assets/images/preloader.png");
        this.load.image("strokeImage", "assets/images/loadingBar_0.png");
        this.load.image("progressImage", "assets/images/loadingBar_1.png");
        this.load.image('ProgressBg', 'assets/images/ProgressBg.png');
        this.load.image('ProgressFillBg', 'assets/images/ProgressFillBg.png');
        this.load.atlas('ui', 'https://labs.phaser.io/assets/ui/nine-slice.png', 'https://labs.phaser.io/assets/ui/nine-slice.json');
    }

    create() {
        // this.add.image(this.OriginX, this.OriginY, "preloader");
        this.registry.set('highscore', 0);
        this.scene.start('Preloader');
    }
}
