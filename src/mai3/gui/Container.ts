import Phaser from 'phaser';
import { BaseConfig, ButtonHandle } from '../types';
import Utils from "../../mai3/utils";
import BaseScene from "../scene";

const enabledEventTypes = ['ImageButton', 'TextButton', 'RoundedButton', 'Label', 'Text', 'Image', 'Checkbox', 'CheckboxGroup', 'Slider', 'ProgressBar', 'VolumeSlider'];

export class Container extends Phaser.GameObjects.Container {
  private _id: string;
  private _type?: string;
  private _bounds?: Phaser.Geom.Rectangle;
  private _hitArea?: Phaser.Geom.Rectangle | Phaser.Geom.Circle;
  protected _baseConfig?: BaseConfig;
  scene: BaseScene;

  constructor(scene: BaseScene, baseConfig?: BaseConfig, type?: string) {
    super(scene, baseConfig?.x, baseConfig?.y);
    this._id = baseConfig?.id ?? '';
    this.scene = scene;
    this.Type = type ?? 'Container';
    this._baseConfig = baseConfig;

    this.onEvents();
  }

  protected onEvents() {
    if (this._baseConfig?.enableDrag) {
      this.enableDrag();
      return;
    }

    if (!this.isEnabledEvent()) return;

    this.setEventInteractive();
    this.on('pointerover', this.handleHover, this);
    this.on('pointerout', this.handleOut, this);
    this.on('pointerdown', this.handleDown, this);
    this.on('pointerup', this.handleUp, this);
    this.on('pointerupoutside', this.handleUp, this);
  }

  public updateConfig(config: BaseConfig) {
    this._baseConfig = config;
  }

  protected isEnabledEvent(): boolean {
    return enabledEventTypes.includes(this.Type);
  }

  public setAutoArea() {
    if (!this._hitArea) {
      this._hitArea = new Phaser.Geom.Rectangle();
    }

    const hitAera = this._hitArea as Phaser.Geom.Rectangle;
    hitAera.setPosition(0, 0);
    hitAera.setSize(this.RealWidth, this.RealHeight);
    this.setInteractive(hitAera, Phaser.Geom.Rectangle.Contains);
  }

  public setEventInteractive() {
    if (!this._hitArea) {
      this._hitArea =
        this._baseConfig?.geomType === 'Circle'
          ? new Phaser.Geom.Circle()
          : new Phaser.Geom.Rectangle();
    }

    if (this._hitArea instanceof Phaser.Geom.Circle) {
      const radius = this._baseConfig?.radius ?? 0;
      const borderWidth = this._baseConfig?.borderWidth ?? 0;
      this._hitArea.setPosition(radius + borderWidth, radius + borderWidth);
      this._hitArea.radius = radius + borderWidth;
      this.setInteractive(this._hitArea, Phaser.Geom.Circle.Contains);
    } else {
      this._hitArea.setSize(this.RealWidth, this.RealHeight);
      this._hitArea.setPosition(0, 0);
      this.setInteractive(this._hitArea, Phaser.Geom.Rectangle.Contains);
    }
  }

  protected handleHover() {
    this.handleEvent(this._baseConfig?.handleHover);
    this.blendMode = 'add';
  }

  protected handleOut() {
    this.handleEvent(this._baseConfig?.handleOut);
    this.blendMode = 'normal';
  }

  protected handleDown() {
    this.handleEvent(this._baseConfig?.handleDown);
    this.alpha = 0.5;
  }

  protected handleUp() {
    this.handleEvent(this._baseConfig?.handleUp);
    this.alpha = 1;
  }

  protected handleEvent(handle?: ButtonHandle) {
    if (handle?.audio) {
      const sound = this.scene.sound.add(handle?.audio);
      sound.play();
    }

    if (handle?.handleFn) {
      handle?.handleFn();
    }

    this.blendMode = 'add';
  }

  public findChild(id: string, gameObject?: Phaser.GameObjects.GameObject) {
    const container = (gameObject ?? this) as Container;
    const result = container.getAll().find((item) => (item as Container).id === id);
    return result;
  }

  public enableDrag() {
    this.setEventInteractive();
    this.scene.input.setDraggable(this);
    this.on('drag', this.onDrag);
  }

  public onDrag(pointer: Phaser.Input.Pointer, dragX: number, dragY: number) {
    if (this.Type === 'RoundedButton') {
      const radius = this._baseConfig?.radius ?? 0;
      const borderWidth = this._baseConfig?.borderWidth ?? 0;
      const radiusBorderWidth = (radius + borderWidth) * 2;
      this.setPosition(
        Utils.clampX(dragX, this.scene.scale.width, radiusBorderWidth),
        Utils.clampY(dragY, this.scene.scale.height, radiusBorderWidth)
      );
    } else {
      this.setPosition(
        Utils.clampX(dragX, this.scene.scale.width, this.Width),
        Utils.clampY(dragY, this.scene.scale.height, this.Height)
      );
    }

    this.onDragUpdate(pointer, this.x, this.y);
  }

  public onDragUpdate(pointer: Phaser.Input.Pointer, dragX: number, dragY: number) {
    console.log(pointer, dragX, dragY);
  }

  get id(): string {
    return this._id ?? '';
  }

  set id(id: string) {
    this._id = id;
  }

  public RefreshBounds() {
    this._bounds = this.getBounds();
  }

  private cacheBounds() {
    if (!this._bounds) this.RefreshBounds();
  }

  get Width() {
    return (this._baseConfig?.width ?? 0) + (this._baseConfig?.borderWidth ?? 0);
  }

  get Height() {
    return (this._baseConfig?.height ?? 0) + (this._baseConfig?.borderWidth ?? 0);
  }

  get RealWidth() {
    this.cacheBounds();
    return this._bounds?.width ?? 0;
  }

  get RealHeight() {
    this.cacheBounds();
    return this._bounds?.height ?? 0;
  }

  get RealSize() {
    return { width: this.Width, height: this.Height };
  }

  get Top() {
    this.cacheBounds();
    return this._bounds?.top ?? 0;
  }

  get Left() {
    this.cacheBounds();
    return this._bounds?.left ?? 0;
  }

  get Right() {
    this.cacheBounds();
    return this._bounds?.right ?? 0;
  }

  get Bottom() {
    this.cacheBounds();
    return this._bounds?.bottom ?? 0;
  }

  get CenterX() {
    this.cacheBounds();
    return this._bounds?.centerX ?? 0;
  }

  get CenterY() {
    this.cacheBounds();
    return this._bounds?.centerY ?? 0;
  }

  get X() {
    this.cacheBounds();
    return this._bounds?.x ?? 0;
  }

  get Y() {
    this.cacheBounds();
    return this._bounds?.y ?? 0;
  }

  get Type() {
    return this._type ?? 'Container';
  }

  set Type(type: string) {
    this._type = type;
  }

  public addChild(child: Phaser.GameObjects.GameObject) {
    if (!this.exists(child))
      this.add(child);
  }

  public addChildAt(child: Phaser.GameObjects.GameObject, index?: number) {
    if (!this.exists(child))
      this.addAt(child, index);
  }

  drawBorderLine?: Phaser.GameObjects.Rectangle | Phaser.GameObjects.Arc;
  public debugDrawBorderLine(color?: number) {
    const borderWidth = this._baseConfig?.borderWidth ?? 0;
    const width = this.getBounds().width + borderWidth * 2;
    const height = this.getBounds().height + borderWidth * 2;

    if (this.drawBorderLine) {
      this.drawBorderLine.destroy(true);
    }

    if (this._baseConfig?.geomType === 'Circle') {
      this.drawBorderLine = this.scene.add.circle(0, 0, width / 2, 0x000000, 0.1);
      this.drawBorderLine.setStrokeStyle(4, color ?? 0xa52a2a, 1);
      this.drawBorderLine.setOrigin(0);
    } else {
      this.drawBorderLine = this.scene.add.rectangle(0, 0, width - 4, height - 4, 0x000000, 0.1);
      this.drawBorderLine.setStrokeStyle(4, color ?? 0xa52a2a, 1);
      this.drawBorderLine.setOrigin(0);
    }

    this.add(this.drawBorderLine);
  }

  public debugHitArea() {
    this.scene.input.enableDebug(this);
  }

  debug(color?: number) {
    this.debugDrawBorderLine(color);
    this.debugHitArea();
  }
}