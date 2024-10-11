// import { loadConfig } from "@/config";
import { BaseScene } from "../../../dist";
import { GameFi, GameFiInitializationParams, Wallet } from "../../../dist/game";
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
    this.createCloseDialogButton();
    this.createDraggableButton();
    this.createRoundedButton();
    this.createStartGameButton();
    this.createPlayButton();
    this.createStartButton();
    this.createPauseIcon();
    this.createTextButton();
    this.ton_sdk();
  }

  private async ton_sdk() {
    // const config = await loadConfig();
    // const gameFiParams: GameFiInitializationParams = {
    //   network: config.NETWORK,
    //   connector: {
    //     manifestUrl: config.APP_MANIFEST_URL,
    //     actionsConfiguration: {}
    //   },
    //   // contentResolver: {
    //   //     // use urlProxy if you you are going to use methods like:
    //   //     // getNftCollection, getNftItem, etc.
    //   //     urlProxy: `${config.ENDPOINT}/fix-cors?url=%URL%`
    //   // },
    //   // merchant: {
    //   //     // in-game jetton purchases come to this address
    //   //     jettonAddress: config.TOKEN_MASTER,
    //   //     // in-game TON purchases come to this address
    //   //     tonAddress: config.TOKEN_RECIPIENT
    //   // }
    // }

    // const gameFi = await GameFi.create(gameFiParams);

    this.mai3.add
      .connectWalletButton({
        x: 200,
        y: 200,
        width: 160,
        height: 60,
        style: "dark",
        language: "en",
        walletApp: "telegram-wallet",
        onWalletChange: (wallet: Wallet | null) => {
          console.log("wallet address: ", wallet?.account.address);
        },
        handleUp: {
          handleFn: () => {
            console.log("handleUp");
            // this.scene.start("DemoScene");
          },
        },
        handleDown: {
          handleFn: () => {
            console.log("handleDown");
            // this.scene.start("DemoScene");
          },
        },
      })
      .debugHitArea();
    
    // const cfg: GameFiInitializationParams = {
    //   network?: 'testnet',
    //   connector?: WalletConnector | WalletConnectorParams;
    //   client?: TonClient4 | TonClient4Parameters;
    //   contentResolver?: ContentResolverParams;
    //   merchant?: MerchantParams;
    // };
        
    // GameFi.create(cfg);
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
        handleFn: () => {},
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
        handleFn: () => {},
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
        handleFn: () => {},
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
        handleFn: () => {},
      },
    });
  }
}
