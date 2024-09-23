import { BaseScene, ProgressBar } from "../../../dist";
import { ProgressConfig } from "../../../dist/types";
export class ProgressBarDemo extends BaseScene {
  config?: ProgressConfig;
  progressBar1?: ProgressBar;
  nextScene?: string

  constructor() {
    super("ProgressBarDemo");
  }

  async preload() {
    this.createProgressBar();
  }

  async create() {
    // this.createProgressBar();
    this.createReturnButton();
  }

  createProgressBar() {
    this.config = {
      x: 50, y: 200,
      width: 480,
      height: 40,
      radius: 20,
      borderWidth: 4,
      borderColor: 0xcf4b00,
      bgColor: 0x008B8B,
      fillColor: 0xff8221,
      bgTexture: "ProgressBg",
      fillTexture: "ProgressFillBg",
      process: 0.61,
    };
    this.progressBar1 = this.mai3.add.progressBar(this.config);

    const progressBar2 = this.mai3.add.progressBar({
      x: 50, y: 100,
      width: 480,
      height: 40,
      radius: 10,
      borderWidth: 4,
      borderColor: 0xC71585,
      bgColor: 0x008B8B,
      fillColor: 0xff8221,
      bgTexture: "",//strokeImage
      fillTexture: "",//progressImage
      process: 0.61,
    });

    //给一个初始化的进度条的值
    this.progressBar1?.updateProgress(0.61);
    progressBar2.updateProgress(0.61);

    this.load.on("progress", async (progress: number) => {
      // await Utils.sleep(3000);
      console.log('progress: ', progress);
      this.progressBar1?.updateProgress(progress);
      progressBar2.updateProgress(progress);
      // progressBar.updateProgress(progress);
      this.add.text(10, 10, "isnafosdansa")
    });
  }

  private createReturnButton() {
    this.mai3.add.textButton({
      x: 10,
      y: 10,
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
      }
    });
  }
}