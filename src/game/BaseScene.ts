import Phaser from 'phaser';
import { Mai3Plugin } from '../plugins/Mai3Plugin';
import ResizableComponentManager from '../utils/ResizableComponentManager';
import { Checkbox } from "../ui/Checkbox";
import { CheckboxGroup } from "../ui/CheckboxGroup";
import { Container } from "../ui/Container";
import { ImageButton } from "../ui/ImageButton";
import { Image } from "../ui/Image";
import { Label } from "../ui/Label";
import { ProgressBar } from "../ui/ProgressBar";
import { RoundedButton } from "../ui/RoundedButton";
import { Slider } from "../ui/Slider";
import { TextBox } from "../ui/TextBox";
import { TextButton } from "../ui/TextButton";
import { VolumeSlider } from "../ui/VolumeSlider";
import { Text } from "../ui/Text";
import GridItem from '../ui/GridItem';

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

  createChildFromConfig(config: any): Container {
    const childClasses: { [key: string]: any } = {
      Image: Image,
      TextButton: TextButton,
      TextBox: TextBox,
      ImageButton: ImageButton,
      RoundedButton: RoundedButton,
      Checkbox: Checkbox,
      CheckboxGroup: CheckboxGroup,
      Label: Label,
      ProgressBar: ProgressBar,
      Slider: Slider,
      VolumeSlider: VolumeSlider,
      GridItem: GridItem,
      Text: Text,
    };

    const ChildClass = childClasses[config.type] || TextButton;
    return new ChildClass(this, config);
  }
}

export default BaseScene;
