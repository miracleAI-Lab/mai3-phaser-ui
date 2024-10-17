// import { loadConfig } from "@/config";
import { loadTonConfig } from "@/config";
import { BaseScene } from "../../../dist";
import { Wallet } from "../../../dist/game";
export class ButtonDemo extends BaseScene {
  constructor() {
    super("ButtonDemo");
  }

  preload() {
    super.preload();
    this.load.atlas(
      "buttons",
      "https://labs.phaser.io/assets/ui/nine-slice.png",
      "https://labs.phaser.io/assets/ui/nine-slice.json"
    );
  }

  create() {
    this.createButtons();
  }

  private createButtons() {

    this.createReturnButton();

    this.createImgBtn();
    this.createRoundedBtn();
    this.createTextBtn();
    this.createConnectWalletBtn();

    // this.createCloseDialogButton();
    // this.createDraggableButton();
    // this.createRoundedButton();
    // this.createStartGameButton();
    // this.createPlayButton();
    // this.createStartButton();
    // this.createPauseIcon();
    // this.createTextButton();
    // this.ton_sdk();
  }

  private createImgBtn() {
    this.mai3.add.imageButton({
      x: 20,
      y: 160,
      width: 223,
      height: 60,
      texture: "imgBtn",
      draggable: true,
      handleHover: {
        audio: "sfx-hover",
        texture: "playBtn",// 无效?
        handleFn: () => {
          console.log("handleHover");
        },
      },
      handleOut: {
        texture: "playBtn",// 无效?
        handleFn: () => {
          console.log("handleOut");
        },
      },
      handleDown: {
        audio: "sfx-press",
        texture: "playBtn",// 无效?
        handleFn: () => {
          console.log("handleDown");
          this.mai3.add.toast({
            width: 300,
            height: 60,
            text: '矩形自定义图片按钮',
            duration: 3000,
            type: 'info',
            animationType: 'slide',
            margin: { all: 10 },
          }).show()
        },
      },
      handleUp: {
        texture: "playBtn",// 无效?
        handleFn: () => {
          console.log("handleUp");
        },
      },
    });

    this.mai3.add.imageButton({
      x: 300,
      y: 160,
      width: 192,
      height: 48,
      texture: "StartGameButton",
      draggable: true,
      handleHover: {
        audio: "sfx-hover",
        texture: "playBtn",// 无效?
        handleFn: () => {
          console.log("handleHover");
        },
      },
      handleDown: {
        audio: "sfx-press",
        texture: "playBtn",// 无效?
        handleFn: () => {
          console.log("handleDown");
          this.mai3.add.toast({
            width: 300,
            height: 60,
            text: '矩形自定义图片按钮',
            duration: 3000,
            type: 'info',
            animationType: 'slide',
            margin: { all: 10 },
          }).show()
        },
      }
    });

    this.mai3.add.imageButton({
      x: 540,
      y: 160,
      width: 50,
      height: 50,
      texture: "unChecked",
      draggable: true,
      handleHover: {
        audio: "sfx-hover",
        texture: "playBtn",// 无效?
        handleFn: () => {
          console.log("handleHover");
        },
      },
      handleDown: {
        audio: "sfx-press",
        texture: "playBtn",// 无效?
        handleFn: () => {
          console.log("handleDown");
          this.mai3.add.toast({
            width: 300,
            height: 60,
            text: '矩形自定义图片按钮',
            duration: 3000,
            type: 'info',
            animationType: 'slide',
            margin: { all: 10 },
          }).show()
        },
      }
    });

  }

  private createRoundedBtn() {
    //无图
    const btn = this.mai3.add.roundedButton({
      x: 20,
      y: 260,
      radius: 50,
      text: '圆形按钮',
      fontColor: "#fff",
      fontSize: 20,
      frame: 0,
      backgroundAlpha: 1,
      borderColor: 0x900c3f,
      borderWidth: 3,
      backgroundColor: 0xc70039,
      handleHover: {
        audio: "sfx-hover",
      },
      handleDown: {
        audio: "sfx-press",
        handleFn: () => {
          this.mai3.add.toast({
            width: 300,
            height: 60,
            text: '圆形无图按钮 - 文字可自定义',
            duration: 3000,
            type: 'info',
            animationType: 'slide',
            margin: { all: 10 },
          }).show()

          console.log(btn.config)
          btn.config.text = 'hhh'
          // btn.text = 'hhh'
        },
      },
      draggable: true,// 是否拖动
    });

    //有图
    this.mai3.add.roundedButton({
      x: 160,
      y: 260,
      radius: 53,
      texture: "playButton",
      frame: 0,
      draggable: false,// 是否拖动
      backgroundAlpha: 1,
      geomType: "Circle",
      backgroundColor: 0x32cd32,
      handleHover: {
        audio: "sfx-hover",
      },
      handleDown: {
        audio: "sfx-press",
        handleFn: () => {
          this.mai3.add.toast({
            width: 300,
            height: 60,
            text: '圆形自定义图片按钮',
            duration: 3000,
            type: 'info',
            animationType: 'slide',
            margin: { all: 10 },
          }).show()
        },
      },
    });
  }

  private createTextBtn() {

    const btn = this.mai3.add.textButton({
      x: 480,
      y: 420,
      width: 400,
      height: 80,
      borderColor: 0x900c3f,
      borderWidth: 3,
      backgroundColor: 0xc70039,
      text: "Mai3（可拖动改变的）",
      radius: 20,
      textStyle: {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#000",
      },
      handleHover: {
        audio: "sfx-hover",
      },
      handleDown: {
        audio: "sfx-press",
        handleFn: () => {
          btn.text = "哈哈你好呀，我被拖动了";
        },
      },
      handleUp: {
        handleFn: () => {
          btn.text = "Mai3（可拖动改变的）"
        },
      },
      draggable: true,
    });


    for (let i = 1; i <= 3; i++) {
      let radius;

      switch (i) {
        case 1:
          radius = 0;
          break;
        case 2:
          radius = 20;
          break;
        case 3:
          radius = 100;
          break;
        default:
          radius = 0;
      }

      this.mai3.add.textButton({
        x: 20,
        y: 300 + 80 * i + 40 * i,
        width: 400,
        height: 80,
        borderColor: 0x900c3f,
        borderWidth: 3,
        backgroundColor: 0xc70039,
        text: "自定义文字的圆角按钮",
        radius,
        textStyle: {
          fontFamily: "Arial",
          fontSize: "24px",
          color: "#FFFFFF",
        },

        draggable: true,

        handleHover: {
          audio: "sfx-hover",
        },
        handleDown: {
          audio: "sfx-press",
          handleFn: () => {
            this.mai3.add.toast({
              width: 300,
              height: 60,
              text: '自定义文字的圆角按钮',
              duration: 3000,
              type: 'info',
              animationType: 'slide',
              margin: { all: 10 },
            }).show()
          },
        },
      });

    }

  }

  private async createConnectWalletBtn() {
    const config = await loadTonConfig();
    this.mai3.add.connectWalletButton({
      x: 20,
      y: 780,
      width: 153,
      height: 67,
      texture: "startButton",
      language: "en",
      walletApp: "telegram-wallet",
      manifestUrl: config.APP_MANIFEST_URL,
      appUrl: config.APP_URL,
      onWalletChange: (wallet: Wallet | null) => {
        console.log("wallet address: ", wallet?.account.address);
      },
      handleUp: {
        handleFn: () => {
          console.log("handleUp");
        },
      },
      handleDown: {
        handleFn: () => {
          console.log("handleDown");
        },
      },
    })
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
    });
  }

  private createCloseDialogButton() {
    this.mai3.add.textButton({
      x: 10,
      y: 70,
      width: 200,
      height: 80,
      borderColor: 0x900c3f,
      borderWidth: 3,
      backgroundColor: 0xc70039,
      text: "关闭窗口",
      radius: 20,
      textStyle: {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#FFFFFF",
      },
      handleHover: {
        audio: "sfx-hover",
      },
      handleDown: {
        audio: "sfx-press",
      },
      handleUp: {
        handleFn: () => { },
      },
    });
  }

  private createDraggableButton() {
    const btn = this.mai3.add.textButton({
      x: 220,
      y: 70,
      borderColor: 0xff5733,
      borderWidth: 3,
      backgroundColor: 0xffc300,
      text: "Mai3（可拖动）",
      radius: 20,
      textStyle: {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#000",
      },
      handleHover: {
        audio: "sfx-hover",
      },
      handleDown: {
        audio: "sfx-press",
        handleFn: () => {
          btn.text = "哈哈你好";
        },
      },
      draggable: true,
    });
  }

  private createRoundedButton() {
    //无图
    this.mai3.add.roundedButton({
      x: 430,
      y: 70,
      radius: 100,
      texture: "",
      frame: 0,
      draggable: false,
      backgroundAlpha: 1,
      geomType: "Circle",
      borderWidth: 6,
      borderColor: 0xffd700,
      backgroundColor: 0x32cd32,
      handleHover: {
        audio: "sfx-hover",
      },
      handleDown: {
        audio: "sfx-press",
        handleFn: () => { },
      },
    });

    //有图
    this.mai3.add.roundedButton({
      x: 430,
      y: 300,
      radius: 100,
      texture: "cangshu",
      frame: 0,
      draggable: false,
      backgroundAlpha: 1,
      geomType: "Circle",
      borderWidth: 6,
      borderColor: 0xffd700,
      backgroundColor: 0x32cd32,
      handleHover: {
        audio: "sfx-hover",
      },
      handleDown: {
        audio: "sfx-press",
        handleFn: () => { },
      },
    });
  }

  private createStartGameButton() {
    const btn = this.mai3.add.imageButton({
      x: 10,
      y: 160,
      width: 160,
      height: 60,
      texture: "StartGameButton",
      borderWidth: 3,
      handleHover: {
        audio: "sfx-hover",
        texture: "StartGameButtonHover",
      },
      handleOut: {
        texture: "StartGameButton",
      },
      handleDown: {
        audio: "sfx-press",
        texture: "StartGameButtonDown",
        handleFn: () => {
          console.log("handleDown");
        },
      },
      handleUp: {
        texture: "StartGameButton",
        handleFn: () => {
          console.log("handleUp");
        },
      },
    });

    btn.debugHitArea();
  }

  private createPlayButton() {
    this.mai3.add.imageButton({
      x: 50,
      y: 600,
      width: 152.95,
      height: 71.58,
      texture: "playButton",
      handleDown: {
        audio: "sfx-press",
        handleFn: () => {
          console.log("handleDown");
        },
      },
      handleUp: {
        handleFn: () => {
          console.log("handleUp");
        },
      },
    })
  }

  private createStartButton() {
    this.mai3.add.imageButton({
      x: 50,
      y: 700,
      width: 152.95,
      height: 66.27,
      texture: "startButton",
      handleDown: {
        audio: "sfx-press",
        handleFn: () => {
          console.log("handleDown");
        },
      },
      handleUp: {
        handleFn: () => {
          console.log("handleUp");
        },
      },
    })
  }

  private createPauseIcon() {
    this.mai3.add.imageButton({
      x: 50,
      y: 830,
      width: 40,
      height: 60,
      texture: "pauseIcon",
      handleDown: {
        audio: "sfx-press",
        handleFn: () => {
          console.log("handleDown");
        },
      },
      handleUp: {
        handleFn: () => {
          console.log("handleUp");
        },
      },
    })
  }

  private createTextButton() {
    this.mai3.add.textButton({
      x: 220,
      y: 600,
      width: 203.55,
      height: 65.86,
      borderColor: 0x3F2806,
      borderWidth: 6,
      backgroundColor: 0xF2CB26,
      text: "TextButton",
      radius: 10,
      textStyle: {
        fontFamily: "Arial",
        fontSize: "30px",
        color: "#FFFFFF",
      },
      handleHover: {
        audio: "sfx-hover",
      },
      handleDown: {
        audio: "sfx-press",
      },
      handleUp: {
        handleFn: () => { },
      },
    });
  }
}
