import { BaseScene } from '../../../dist';

export class SpriteDemo extends BaseScene {
  // private catGrid!: Grid;

  constructor() {
    super("SpriteDemo");
  }

  preload() {
    super.preload();

    this.load.image("cat0", "/assets/images/cat0.png");
    this.load.image("cat1", "/assets/images/cat1.png");
    this.load.spritesheet("fight96", "/assets/sprites/fight96.png", { frameWidth: 32, frameHeight: 50 });

  }

  create() {
    this.createSprite();
    this.createAnimsSprite();
    this.createReturnButton();
  }
  private createSprite() {

    this.mai3.add.sprite({
      x: 100,
      y: 100,
      width: 64,
      height: 100,
      key: "fight96",
      frame: 0
    });

    this.anims.create({
      key: "fight",
      frames: this.anims.generateFrameNumbers("fight96", { frames: [0, 1, 2] }),
      frameRate: 10,
      repeat: -1,
    });

    this.mai3.add.sprite({
      x: 200,
      y: 100,
      width: 64,
      height: 100,
      key: "fight96",
      anims: "fight"
    });
  }

  private createAnimsSprite() {
    this.anims.create({
      key: "walk",
      frames: [{ key: "cat0" }, { key: "cat1" }],
      frameRate: 10,
      repeat: -1,
    });

    const cat = this.mai3.add.sprite({
      x: 100,
      y: 200,
      width: 64,
      height: 100,
      key: "cat0",
    });

    cat.instance?.play("walk");
  }

  private createReturnButton() {
    this.mai3.add.textButton({
      x: 10,
      y: 10,
      width: 150,
      height: 50,
      text: "返回DemoScene",
      backgroundColor: 0x4caf50,
      borderColor: 0x45a049,
      borderWidth: 2,
      radius: 10,
      textStyle: {
        fontFamily: "Arial",
        fontSize: "18px",
        color: "#FFFFFF",
      },
      handleUp: {
        handleFn: () => {
          this.scene.start("DemoScene");
        },
      },
      enablePointer: true,
    });
  }

  update() { }
}