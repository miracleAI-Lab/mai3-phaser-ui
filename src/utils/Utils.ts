import { RoundedRectRadius } from "../types";

const Horizontal = [0, 'x', 'h', 'horizontal', 'left-to-right'];
const Vertical = [1, 'y', 'v', 'vertical', 'top-to-bottom'];

const Utils = {
  isHorizontal(val: any): boolean {
    return Horizontal.includes(val);
  },
  
  isVertical(val: any): boolean {
    return Vertical.includes(val);
  },

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  hexColorToNumber(color: string) {
    const colorNumber = parseInt(color.replace('#', ''), 16);
    return colorNumber;
  },

  numberToHex(num: number, minLength: number = 2): string {
    let hex = num.toString(16).toLowerCase();
    while (hex.length < minLength) {
      hex = '0' + hex;
    }

    return '#' + hex;
  },

  drawRoundedRectRenderTexture(scene: Phaser.Scene, x?: number, y?: number, width?: number, height?: number, borderWidth?: number, radius?: RoundedRectRadius, borderColor?: number, fillColor?: number, backgroundAlpha?: number) {
    let rt = scene.make.renderTexture({ width, height });
    rt = this.reDrawRoundedRectRenderTexture(scene, rt, x, y, width, height, borderWidth, radius, borderColor, fillColor, backgroundAlpha);
    return rt;
  },

  drawCircleRenderTexture(scene: Phaser.Scene, x: number, y: number, radius: number, borderWidth: number, borderColor: number, fillColor: number) {
    let rt = scene.make.renderTexture({ width: radius * 2, height: radius * 2 });
    rt = this.reDrawCircleRenderTexture(scene, rt, x, y, radius, borderWidth, borderColor, fillColor);
    return rt;
  },

  reDrawRoundedRectRenderTexture(scene: Phaser.Scene, rt?: Phaser.GameObjects.RenderTexture, x?: number, y?: number, width?: number, height?: number, borderWidth?: number, radius?: RoundedRectRadius, borderColor?: number, fillColor?: number, backgroundAlpha?: number) {
    let g = scene.make.graphics();
    const gs = this.reDrawRoundedRect(g, scene, x, y, width, height, borderWidth, radius, borderColor, fillColor, backgroundAlpha);
    gs?.setVisible(false);

    rt?.destroy(true);
    rt = scene.make.renderTexture({ width, height });
    rt.setDisplaySize(width!, height!);
    rt.clear();
    rt.beginDraw();
    rt.batchDraw(gs, 0, 0);
    rt.endDraw();
    rt.setOrigin(0);
    gs?.destroy();
    return rt;
  },

  reDrawCircleRenderTexture(scene: Phaser.Scene, rt?: Phaser.GameObjects.RenderTexture, x?: number, y?: number, _radius?: number, borderWidth?: number, borderColor?: number, fillColor?: number) {
    const radius = _radius ?? 0;
    const width = radius! * 2;
    const height = width;
    let g = scene.make.graphics();
    const gs = this.reDrawCircle(g, x, y, radius, borderWidth, borderColor, fillColor);
    gs.setVisible(false);

    rt?.destroy(true);
    rt = scene.make.renderTexture({ width, height });
    rt.clear();
    rt.beginDraw();
    rt.batchDraw(gs, 0, 0);
    rt.endDraw();
    rt.setOrigin(0);
    rt.setDisplaySize(radius * 2!, radius * 2!);
    gs?.destroy();
    return rt;
  },

  drawRoundedRect(scene: Phaser.Scene, x?: number, y?: number, width?: number, height?: number, borderWidth?: number, radius?: number, borderColor?: number, fillColor?: number, backgroundAlpha?: number) {
    let g = scene.make.graphics();
    const gs = this.reDrawRoundedRect(g, scene, x, y, width, height, borderWidth, radius, borderColor, fillColor, backgroundAlpha);
    return gs;
  },

  drawCircle(scene: Phaser.Scene, x: number, y: number, radius: number, borderWidth: number, borderColor: number, fillColor: number) {
    const graphics = scene.make.graphics();
    this.reDrawCircle(graphics, x, y, radius, borderWidth, borderColor, fillColor);
    return graphics;
  },

  reDrawCircle(graphics: Phaser.GameObjects.Graphics, x?: number, y?: number, radius?: number, borderWidth?: number, borderColor?: number, fillColor?: number) {
    const _x = x ?? 0;
    const _y = y ?? 0;
    const _radius = radius ?? 0;
    const _borderWidth = borderWidth ?? 0;
    const _borderColor = borderColor ?? 0x000000;
    const _fillColor = fillColor ?? 0x000000;
    // RoundedButton组件新功能必须去除这个限制
    // if (_x < _radius || _y < _radius)
    //   throw new Error('"The x and y coordinate values cannot be less than the radius."');

    if (_radius < _borderWidth)
      throw new Error('"The radius value cannot be less than the borderWidth."');

    graphics.clear();
    if (_borderWidth > 0) {
      graphics.fillStyle(_borderColor)
      graphics.fillCircle(_x, _y, _radius)
    }

    graphics.fillStyle(_fillColor)
    graphics.fillCircle(_x, _y, _radius - _borderWidth);

    return graphics;
  },

  reDrawRoundedRect(g?: Phaser.GameObjects.Graphics, scene?: Phaser.Scene, x?: number, y?: number, width?: number, height?: number, borderWidth?: number, radius?: RoundedRectRadius, borderColor?: number, fillColor?: number, backgroundAlpha?: number) {
    if (!g) g = scene?.make.graphics();
    if (width === 0 || !fillColor) {
      g!.alpha = 0;
      return g;
    }

    x = x ?? 0;
    y = y ?? 0;
    width = width ?? 0;
    height = height ?? 0;
    radius = radius ?? 0;
    borderWidth = borderWidth ?? 0;
    borderColor = borderColor ?? 0xcf4b00;
    fillColor = fillColor ?? 0xcf4b00;
    let bWidth = (width ?? 0) - borderWidth * 2;
    if (bWidth < 0) bWidth = 0;

    let bHeight = (height ?? 0) - borderWidth * 2;
    if (bHeight < 0) bHeight = 0;

    g?.clear();
    backgroundAlpha = backgroundAlpha ?? 1;
    if (backgroundAlpha === 0) return g;
    if (backgroundAlpha > 0) g!.alpha = backgroundAlpha;
    if (borderWidth > 0) {
      g?.fillStyle(borderColor);
      g?.fillRoundedRect(x, y, width, height, radius);
    }

    g?.fillStyle(fillColor);
    g?.fillRoundedRect(x + borderWidth, y + borderWidth, bWidth, bHeight, radius);
    return g;
  },

  ZERO_POSITION() {
    return { x: 0, y: 0 };
  },

  clampX(x: number, sceneWidth: number, displayWidth: number) {
    return Phaser.Math.Clamp(x, 0, sceneWidth - displayWidth);
  },

  clampY(
    y: number,
    sceneHeight: number,
    displayHeight: number
  ) {
    return Phaser.Math.Clamp(y, 0, sceneHeight - displayHeight);
  },

  isNullOrZeroOrEmpty(value: any): boolean {
    return value === undefined || value === '' || value === 0;
  },

  GetValue(source: object, key: string, defaultValue: any, altSource?: object): any {
    return Phaser.Utils.Objects.GetValue(source, key, defaultValue, altSource);
  },

  MergeRight(obj1: object, obj2: object): object {
    return Phaser.Utils.Objects.MergeRight(obj1, obj2);
  },

  getWorldPosition(transformObj: Phaser.GameObjects.Components.Transform) {
    const worldTransform = transformObj.getWorldTransformMatrix();
    const worldX = worldTransform.tx;
    const worldY = worldTransform.ty;
    return { x: worldX, y: worldY };
  },

  getLocalPosition(transformObj: Phaser.GameObjects.Components.Transform) {
    const localTransform = transformObj.getLocalTransformMatrix();
    const localX = localTransform.tx;
    const localY = localTransform.ty;
    return { x: localX, y: localY };
  }
}

export default Utils;