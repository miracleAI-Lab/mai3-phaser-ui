import { BaseScene, Tabs } from "../../../dist";
export class TabsDemo extends BaseScene {
  private tabs!: Tabs;

  constructor() {
    super('TabsDemo');
  }

  preload() {
    super.preload();
  }

  async create() {
    this.createTabs();
    this.createReturnButton();
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
      },
    });
  }

  private createTabs() {
    this.tabs = this.mai3.add.tabs({
      x: 10,
      y: 500,
      height: 80,
      padding: 10,
      background: 0x191970,
      items: [
        { title: 'tab1', texture: 'StartGameButton' },
        { title: 'tab2', texture: 'StartGameButtonDown' },
        { title: 'tab3', texture: 'StartGameButtonHover' }
      ]
    });

    // 添加标签切换事件监听
    this.tabs.on('tabChange', (index: number) => {
      const toast = this.mai3.add.toast({
        x: 400,
        y: 300,
        width: 200,
        height: 60,
        text: `切换到标签 ${index + 1}`,
        type: 'info',
        textAlign: 'center',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        animationType: 'fade',
        backgroundColor: 0x008B00,
        textStyle: {
          fontFamily: 'Arial',
          fontSize: '18px',
          color: '#FFFFFF',
        },
        duration: 2000
      });
      toast.show();
      // 在这里可以添加切换标签时的逻辑
    });
  }

  update() { }
}