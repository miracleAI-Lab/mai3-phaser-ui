import { BaseScene } from "../game";
import { Container } from "./Container";
import { Panel } from "./Panel";

class Group extends Panel {
  parentContainer: Container;
  SORT_ASCENDING: number;
  SORT_DESCENDING: number;
  version: number;
  alignToMapping: Record<number, (gameObject: Phaser.GameObjects.GameObject, alignTo: Phaser.GameObjects.GameObject, offsetX?: number, offsetY?: number) => void>;
  worldPosition: { x: number; y: number };

  constructor(scene: BaseScene, x: number = 0, y: number = 0) {
    super(scene, { x, y });
    scene.add.existing(this);

    this.parentContainer = this;

    this.SORT_ASCENDING = -1;
    this.SORT_DESCENDING = 1;

    this.version = 3;

    // 模拟 Phaser CE 的 GameObject.alignTo
    this.alignToMapping = {
      0: Phaser.Display.Align.To.TopLeft,
      1: Phaser.Display.Align.To.TopCenter,
      8: Phaser.Display.Align.To.RightCenter,
      11: Phaser.Display.Align.To.BottomCenter,
    };

    this.worldPosition = { x: this.x, y: this.y };
  }

  /** @private 别名以匹配 Phaser CE */
  get children(): Phaser.GameObjects.GameObject[] {
    return this.list;
  }

  get realHeight(): number {
    return this.getBounds().height - this.y;
  }

  get realWidth(): number {
    return this.getBounds().width - this.x;
  }

  /** 设置组中每个成员的原点 */
  setOrigin(x: number = 0, y: number = 0): void {
    let node: Phaser.GameObjects.GameObject;

    for (let i = 0; i < this.children.length; i++) {
      node = this.children[i];

      if ('setOrigin' in node && typeof (node as any).setOrigin === 'function') {
        (node as any).setOrigin(x, y);
      }
    }
  }

  getNodes(): Phaser.GameObjects.GameObject[] {
    return this.getAll();
  }

  // 无法自动对齐到容器
  alignToContainerBottom(previousNode: Phaser.GameObjects.GameObject, child: Phaser.GameObjects.GameObject): void {
    let previousNodeWidth: number;
    let previousNodeHeight: number;

    if ('getBounds' in previousNode && typeof (previousNode as any).getBounds === 'function') {
      const bounds = (previousNode as any).getBounds();
      previousNodeWidth = bounds.width - this.worldPosition.x;
      previousNodeHeight = bounds.height - this.worldPosition.y;
    } else {
      previousNodeWidth = (previousNode as any).width || 0;
      previousNodeHeight = (previousNode as any).height || 0;
    }

    const centerX = previousNodeWidth * 0.5;
    const bottomY = previousNodeHeight;

    let w = (child as any).width || 0;
    if ('getBounds' in child && typeof (child as any).getBounds === 'function') {
      w = (child as any).getBounds().width;
    }

    if ('x' in child && 'y' in child) {
      (child as any).x = centerX - w * 0.5;
      (child as any).y = ('getBounds' in previousNode && typeof (previousNode as any).getBounds === 'function' ? (previousNode as any).getBounds().y : 0) + bottomY;
    }
  }

  /** 容器无法自动对齐 */
  alignContainerToBottom(previousNode: Phaser.GameObjects.GameObject, child: Phaser.GameObjects.GameObject): void {
    if ('getBounds' in previousNode && typeof (previousNode as any).getBounds === 'function' && 'x' in previousNode && 'x' in child && 'y' in child) {
      const bounds = (previousNode as any).getBounds();
      const centerX = (previousNode as any).x + bounds.width * 0.5;

      (child as any).x = centerX - ((child as any).width || 0) * 0.5;
      (child as any).y = bounds.y;
    }
  }

  alignContainerToRight(previousNode: Phaser.GameObjects.GameObject, child: Phaser.GameObjects.GameObject): void {
    if ('x' in previousNode && 'x' in child) {
      const rightX = (previousNode as any).x + ((previousNode as any).width || 0);

      (child as any).x = rightX;
    }
  }

  /** 将子对象对齐到组中的最后一个对象。
   * @private
   */
  alignNodeToPrevious(child: Phaser.GameObjects.GameObject, align: number, paddingX: number, paddingY: number): void {
    const nodes = this.getNodes();
    const previousNode = nodes[nodes.length - 2];

    const toGroupAlignFuncs: Record<number, (previousNode: Phaser.GameObjects.GameObject, child: Phaser.GameObjects.GameObject) => void> = {
      11: this.alignContainerToBottom.bind(this), // 列
      8: this.alignContainerToRight.bind(this), // 行
    };

    const toGroupAlignFunc = toGroupAlignFuncs[align];

    if (previousNode instanceof Group) {
      this.alignToContainerBottom(previousNode, child);
    } else if (child instanceof Group && previousNode !== undefined) {
      toGroupAlignFunc(previousNode, child);
    } else if (previousNode !== undefined) {
      this.alignToMapping[align](child, previousNode, paddingX, paddingY);
    }
  }
}
