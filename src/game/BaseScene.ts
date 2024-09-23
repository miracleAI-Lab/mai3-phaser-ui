import Phaser from 'phaser';
import { Mai3Plugin } from '../plugins/Mai3Plugin';
import ResizableComponentManager from '../utils/ResizableComponentManager';
import { Container } from '../ui/Container';
class BaseScene extends Phaser.Scene {
  mai3!: Mai3Plugin;

  // 实时打印坐标位置
  printer: Phaser.GameObjects.Text | undefined;
  isDebugPrint: boolean = true;
  private resizableManager?: ResizableComponentManager;

  constructor(key: string) {
    super({ key });
    this.resizableManager = new ResizableComponentManager(this);
  }

  preload() {   
    if (this.isDebugPrint) {
      const bg = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x551A8B);
      bg.setOrigin(0, 0);
      bg.setInteractive()
        .on('pointerdown', this.printPointer, this)
        .on('pointerup', this.printPointer, this)
        .on('pointermove', this.printPointer, this);

      this.printer = this.add.text(1, 1, `pointer: 0, 0`, {
        fontSize: 18,
        color: "#fff"
      });
    }
  }

  protected printPointer(pointer: Phaser.Input.Pointer) {
    if (this.printer) {
      this.printer.text = `pointer: ${pointer.x.toFixed(2)}, ${pointer.y.toFixed(2)}`;
    }
  }

  protected switchDragResizeComponent(component: Container) {
    this.resizableManager?.clear();
    this.resizableManager?.addComponent(component);
  }

  protected addDragResizeComponent(component: Container) {
    this.resizableManager?.addComponent(component);
  }

  protected addDragResizeComponents(components: Container[]) {
    components.forEach(item => {
      this.resizableManager?.addComponent(item);
    })
  }

  protected clearDragResizeComponents() {
    this.resizableManager?.clear();
  }
}

export default BaseScene;
