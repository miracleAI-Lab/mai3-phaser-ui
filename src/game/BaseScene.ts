import Phaser from 'phaser';
import { Mai3Plugin } from '../plugins/Mai3Plugin';
import ResizableComponentManager from '../utils/ResizableComponentManager';
import { Container } from "../ui/Container";

class BaseScene extends Phaser.Scene {
  mai3!: Mai3Plugin;
  private resizableManager: ResizableComponentManager;
  private printer?: Phaser.GameObjects.Text;
  private isDebugPrint: boolean = true;

  constructor(key: string) {
    super({ key });
    this.resizableManager = new ResizableComponentManager(this);
  }

  preload() {
    if (this.isDebugPrint) {
      this.setupDebugEnvironment();
    }
  }

  private setupDebugEnvironment() {
    const bg = this.add
      .rectangle(0, 0, this.scale.width, this.scale.height, 0x551a8b)
      .setOrigin(0, 0)
      .setInteractive();

    ["pointerdown", "pointerup", "pointermove"].forEach((event) => {
      bg.on(event, this.printPointer, this);
    });

    this.printer = this.add.text(1, 1, "指针: 0, 0", {
      fontSize: "18px",
      color: "#ffffff",
    });
  }

  private printPointer(pointer: Phaser.Input.Pointer) {
    this.printer?.setText(
      `指针: ${pointer.x.toFixed(2)}, ${pointer.y.toFixed(2)}`
    );
  }

  protected switchDragResizeComponent(component: Container) {
    this.resizableManager?.clear();
    this.resizableManager?.addComponent(component);
  }

  protected addDragResizeComponent(component: Container) {
    this.resizableManager?.addComponent(component);
  }

  protected addDragResizeComponents(components: Container[]) {
    components.forEach((item) => {
      this.resizableManager?.addComponent(item);
    });
  }

  protected clearDragResizeComponents() {
    this.resizableManager?.clear();
  }
}

export default BaseScene;
