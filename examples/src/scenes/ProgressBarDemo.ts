import { BaseScene, ProgressBar, Utils } from "../../../dist";
import { ProgressBarConfig } from "../../../dist/types";
export class ProgressBarDemo extends BaseScene {
  config?: ProgressBarConfig;
  progressBar1?: ProgressBar;
  nextScene?: string

  constructor() {
    super("ProgressBarDemo");
  }

  async preload() {
    super.preload();
    // this.createProgressBar();
  }

  async create() {
    // this.createProgressBar();
    this.createReturnButton();

    const config1: ProgressBarConfig = {
      x: 50, y: 200,
      barTexture: {
        key: "ProgressBg",
        width: 400,
      },
      fillTexture: {
        x: 2,
        y: 0,
        key: "ProgressFillBg",
        width: 13,
        leftWidth: 6,
        rightWidth: 6,
      }
    };

    const config2: ProgressBarConfig = {
      x: 50, y: 300,
      barTexture: {
        key: "ui",
        frame: "ButtonOrange",
        width: 400,
      },
      fillTexture: {
        x: 16,
        y: 10,
        key: "ui",
        frame: "ButtonOrangeFill1",
        width: 13,
        leftWidth: 6,
        rightWidth: 6,
      }
    };

    const config3: ProgressBarConfig = {
      x: 50, y: 400,
      barTexture: {
        key: "ui",
        frame: "ButtonOrange",
        width: 400,
      },
      fillTexture: {
        x: 16,
        y: 10,
        key: "ui",
        frame: "ButtonOrangeFill2",
        width: 13,
        leftWidth: 6,
        rightWidth: 6,
      },
      value: 0.5
    };

    const p1 = this.mai3.add.progressBar(config1);
    const p2 = this.mai3.add.progressBar(config2);
    // const p3 = this.mai3.add.imageProgressBar(config3);
    this.mai3.add.progressBar(config3);
    Utils.addTimer(this, 20, () => {
      p1.value = p1.value < 1 ? p1.value + 0.01 : 0.01;
      p2.value = p2.value < 1 ? p2.value + 0.01 : 0.01;
      // p3.value = p3.value < 1 ? p3.value + 0.01 : 0.01;
    });
  }

  // createProgressBar() {
  //   this.config = {
  //     x: 50, y: 200,
  //     width: 480,
  //     height: 40,
  //     radius: 20,
  //     borderWidth: 4,
  //     borderColor: 0xcf4b00,
  //     bgColor: 0x008B8B,
  //     fillColor: 0xff8221,
  //     bgTexture: "ProgressBg",
  //     fillTexture: "ProgressFillBg",
  //     process: 0.61,
  //   };
  //   this.progressBar1 = this.mai3.add.progressBar(this.config);

  //   const progressBar2 = this.mai3.add.progressBar({
  //     x: 50, y: 100,
  //     width: 480,
  //     height: 40,
  //     radius: 10,
  //     borderWidth: 4,
  //     borderColor: 0xC71585,
  //     bgColor: 0x008B8B,
  //     fillColor: 0xff8221,
  //     bgTexture: "",//strokeImage
  //     fillTexture: "",//progressImage
  //     process: 0.61,
  //   });

  //   //给一个初始化的进度条的值
  //   this.progressBar1?.updateProgress(0.61);
  //   progressBar2.updateProgress(0.61);

  //   this.load.on("progress", async (progress: number) => {
  //     // await Utils.sleep(3000);
  //     console.log('progress: ', progress);
  //     this.progressBar1?.updateProgress(progress);
  //     progressBar2.updateProgress(progress);
  //     // progressBar.updateProgress(progress);
  //     this.add.text(10, 10, "isnafosdansa")
  //   });
  // }

  private createReturnButton() {
    this.mai3.add.textButton({
      x: 10,
      y: 20,
      width: 150,
      height: 50,
      text: "返回DemoScene",
      backgroundColor: 0x4CAF50,
      borderColor: 0x45A049,
      borderWidth: 2,
      radius: 10,
      textStyle: {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#FFFFFF',
      },
      handleUp: {
        handleFn: () => {
          this.scene.start('DemoScene');
        }
      },
    });
  }
}