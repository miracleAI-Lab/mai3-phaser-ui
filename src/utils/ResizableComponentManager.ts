import { Container } from "../ui/Container";
import { ProgressBar } from "../ui/ProgressBar";
import { BaseScene } from "../game";

export default class ResizableComponentManager {
  private scene: BaseScene;
  private components: Container[] = [];
  private resizeHandles: Phaser.GameObjects.Rectangle[] = [];
  private resizeContainers: Phaser.GameObjects.Container[] = [];
  private isResizing: boolean = false;
  private activeHandle: Phaser.GameObjects.Rectangle | null = null;
  private originalWidth: number = 0;
  private originalHeight: number = 0;

  constructor(scene: BaseScene) {
    this.scene = scene;
  }

  addComponent(component: Container) {
    this.components.push(component);
    this.createResizeHandles(this.components.length - 1);
  }

  clear() {
    this.resizeContainers.forEach(item => {
      item.destroy(true);
    });

    this.components = [];
    this.resizeContainers = [];
  }

  private createResizeHandles(componentIndex: number) {
    const component = this.components[componentIndex];
    const handleSize = 10;
    const padding = 5;
    const positions = this.getComponentBorderPositions(component, padding);

    const resizeContainer = this.scene.add.container(component.x - padding, component.y - padding);
    this.scene.add.existing(resizeContainer);
    this.resizeContainers.push(resizeContainer);

    const borderGraphics = this.scene.add.graphics();
    borderGraphics.lineStyle(2, 0xffffff, 1);
    borderGraphics.strokeRect(0, 0, component.RealWidth + padding * 2, component.RealHeight + padding * 2);
    resizeContainer.add(borderGraphics);

    positions.forEach((pos, index) => {
      const handle = this.scene.add.rectangle(
        pos.x - component.x + padding,
        pos.y - component.y + padding,
        handleSize,
        handleSize,
        0xffffff
      );
      handle.setOrigin(0.5);
      handle.setInteractive({ draggable: true });
      handle.on('dragstart', () => this.startResize(handle, componentIndex));
      handle.on('drag', (pointer: Phaser.Input.Pointer) => this.resize(pointer, index, componentIndex));
      handle.on('dragend', () => this.endResize());
      this.resizeHandles.push(handle);
      resizeContainer.add(handle);
    });

    this.updateResizeHandles(componentIndex);
  }

  private getComponentBorderPositions(component: Container, padding: number) {
    const left = 0;
    const top = 0;
    const right = component.RealWidth + padding * 2;
    const bottom = component.RealHeight + padding * 2;
    const centerX = component.RealWidth / 2;
    const centerY = component.RealHeight / 2;

    return [
      { x: left, y: top },
      { x: centerX, y: top },
      { x: right, y: top },
      { x: left, y: centerY },
      { x: right, y: centerY },
      { x: left, y: bottom },
      { x: centerX, y: bottom },
      { x: right, y: bottom }
    ];
  }

  private startResize(handle: Phaser.GameObjects.Rectangle, componentIndex: number) {
    this.isResizing = true;
    this.activeHandle = handle;
    this.originalWidth = this.components[componentIndex].RealWidth;
    this.originalHeight = this.components[componentIndex].RealHeight;
  }

  private resize(pointer: Phaser.Input.Pointer, handleIndex: number, componentIndex: number) {
    if (!this.isResizing || !this.activeHandle) return;

    const component = this.components[componentIndex];
    const resizeContainer = this.resizeContainers[componentIndex];
    const dx = pointer.x - resizeContainer.x - this.activeHandle.x;
    const dy = pointer.y - resizeContainer.y - this.activeHandle.y;

    let newWidth = this.originalWidth;
    let newHeight = this.originalHeight;
    let newX = component.x;
    let newY = component.y;

    const minWidth = 50;
    const minHeight = 30;

    switch (handleIndex) {
      case 0: // 左上
        newWidth = Math.max(this.originalWidth - dx, minWidth);
        newHeight = Math.max(this.originalHeight - dy, minHeight);
        newX += this.originalWidth - newWidth;
        newY += this.originalHeight - newHeight;
        break;
      case 1: // 上中
        newHeight = Math.max(this.originalHeight - dy, minHeight);
        newY += this.originalHeight - newHeight;
        break;
      case 2: // 右上
        newWidth = Math.max(this.originalWidth + dx, minWidth);
        newHeight = Math.max(this.originalHeight - dy, minHeight);
        newY += this.originalHeight - newHeight;
        break;
      case 3: // 左中
        newWidth = Math.max(this.originalWidth - dx, minWidth);
        newX += this.originalWidth - newWidth;
        break;
      case 4: // 右中
        newWidth = Math.max(this.originalWidth + dx, minWidth);
        break;
      case 5: // 左下
        newWidth = Math.max(this.originalWidth - dx, minWidth);
        newHeight = Math.max(this.originalHeight + dy, minHeight);
        newX += this.originalWidth - newWidth;
        break;
      case 6: // 下中
        newHeight = Math.max(this.originalHeight + dy, minHeight);
        break;
      case 7: // 右下
        newWidth = Math.max(this.originalWidth + dx, minWidth);
        newHeight = Math.max(this.originalHeight + dy, minHeight);
        break;
    }

    const newConfig = {
      ...(component as any).config,
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight
    };

    if (component.Type === 'RoundedButton') {
      if (newWidth !== this.originalWidth) {
        newConfig.radius = newWidth / 2;
      }
      if (newHeight !== this.originalHeight) {
        newConfig.radius = newHeight / 2;
      }
    }

    this.scene.events.emit("resize", newConfig);

    (component as any).reDraw(newConfig);
    component.setEventInteractive();

    if (component.Type === 'ProgressBar') {
      (component as ProgressBar).updateProgress(newConfig.process);
    }

    this.updateResizeHandles(componentIndex);
  }

  private endResize() {
    this.isResizing = false;
    this.activeHandle = null;
  }

  private updateResizeHandles(componentIndex: number) {
    const component = this.components[componentIndex];
    const resizeContainer = this.resizeContainers[componentIndex];
    const padding = 5;

    resizeContainer.setPosition(component.x - padding, component.y - padding);

    const positions = this.getComponentBorderPositions(component, padding);
    const borderGraphics = resizeContainer.list[0] as Phaser.GameObjects.Graphics;
    borderGraphics.clear();
    borderGraphics.lineStyle(2, 0xffffff, 1);
    borderGraphics.strokeRect(0, 0, component.RealWidth + padding * 2, component.RealHeight + padding * 2);

    resizeContainer.list.slice(1).forEach((child, index) => {
      if (child instanceof Phaser.GameObjects.Rectangle) {
        child.setPosition(positions[index].x, positions[index].y);
      }
    });
  }
}