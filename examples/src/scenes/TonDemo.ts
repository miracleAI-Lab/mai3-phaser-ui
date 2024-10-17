// import { loadConfig } from "@/config";
import { BaseScene } from "../../../dist";
import { GameFi, Wallet } from "../../../dist/game";
import { loadTonConfig } from "@/config";
export class TonDemo extends BaseScene {
  constructor() {
    super("TonDemo");
  }

  preload() {
    super.preload();
  }

  create() {
    this.createButtons();
  }

  private createButtons() {
    this.createReturnButton();
    this.ton_sdk();
  }

  private async ton_sdk() {
    this.createConnectUi();
    // this.mai3.add
    //   .connectWalletButton({
    //     x: 50,
    //     y: 700,
    //     width: 152.95,
    //     height: 66.27,
    //     texture: "startButton",
    //     language: "en",
    //     walletApp: "telegram-wallet",
    //     onWalletChange: (wallet: Wallet | null) => {
    //       console.log("wallet address: ", wallet?.account.address);
    //     },
    //     handleUp: {
    //       handleFn: () => {
    //         console.log("handleUp");
    //       },
    //     },
    //     handleDown: {
    //       handleFn: () => {
    //         console.log("handleDown");
    //       },
    //     },
    //   })
    // .debugHitArea();
  }

  async createConnectUi() {
    const config = await loadTonConfig();
    console.log("config", config);

    let gameFi = await GameFi.create(this, config);
    gameFi.createConnectButton(this,
      {
        x: 200,
        y: 200,
        width: 152,
        height: 66,
        texture: "startButton",
        language: "en",
        walletApp: "telegram-wallet",
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
      }
    )
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
}
