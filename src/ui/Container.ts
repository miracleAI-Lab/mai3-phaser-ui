import Phaser from 'phaser';
import { BaseConfig, ButtonHandle } from '../types';
import Utils from "../utils";
import { BaseScene } from "../game";

const ENABLED_EVENT_TYPES = ['ImageButton', 'TextButton', 'RoundedButton', 'Label', 'Text', 'Image', 'Checkbox', 'CheckboxGroup', 'Slider', 'ProgressBar', 'VolumeSlider'];

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

    this.initializeEvents();
  }

  protected initializeEvents(): void {
    if (this._baseConfig?.enableDrag) {
      this.enableDrag();
      return;
    }

    if (!this.isEventEnabled()) return;

    this.setEventInteractive();
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.on('pointerover', this.handleHover, this);
    this.on('pointerout', this.handleOut, this);
    this.on('pointerdown', this.handleDown, this);
    this.on('pointerup', this.handleUp, this);
    this.on('pointerupoutside', this.handleUp, this);
  }

  public updateConfig(config: BaseConfig): void {
    this._baseConfig = config;
  }

  protected isEventEnabled(): boolean {
    return ENABLED_EVENT_TYPES.includes(this.Type);
  }

  public setAutoArea(): void {
    if (!this._hitArea) {
      this._hitArea = new Phaser.Geom.Rectangle();
    }

    const hitArea = this._hitArea as Phaser.Geom.Rectangle;
    hitArea.setPosition(0, 0);
    hitArea.setSize(this.RealWidth, this.RealHeight);
    this.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
  }

  public setEventInteractive(): void {
    if (this._baseConfig?.geomType === 'Circle') {
      this.createCircleHitArea();
    } else {
      this.createRectangleHitArea();
    }
  }

  private createCircleHitArea() {
    if (!this._hitArea)
      this._hitArea = new Phaser.Geom.Circle();

    const hitArea = this._hitArea as Phaser.Geom.Circle;
    const radius = this._baseConfig?.radius ?? 0;
    const borderWidth = this._baseConfig?.borderWidth ?? 0;
    hitArea.setPosition(radius + borderWidth, radius + borderWidth);
    hitArea.radius = radius + borderWidth;
    this.setInteractive(hitArea, Phaser.Geom.Circle.Contains);
  }

  private createRectangleHitArea() {
    if (!this._hitArea)
      this._hitArea = new Phaser.Geom.Rectangle();

    const width = Utils.GetValue(this.RealSize, 'width', this._baseConfig?.width);
    const height = Utils.GetValue(this.RealSize, 'height', this._baseConfig?.height);
    const hitArea = this._hitArea as Phaser.Geom.Rectangle;
    hitArea.setSize(width, height);
    hitArea.setPosition(0, 0);
    this.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);

    console.log('this.width, this.height: ', `${width}, ${height}`)
  }

  protected handleHover(): void {
    this.handleEvent(this._baseConfig?.handleHover);
  }

  protected handleOut(): void {
    this.handleEvent(this._baseConfig?.handleOut);
  }

  protected handleDown(): void {
    this.handleEvent(this._baseConfig?.handleDown);
    this.alpha = 0.8;
  }

  protected handleUp(): void {
    this.handleEvent(this._baseConfig?.handleUp);
    this.alpha = 1;
  }

  protected handleEvent(handle?: ButtonHandle): void {
    if (handle?.audio) {
      this.scene.sound.play(handle.audio);
    }

    if (handle?.handleFn) {
      handle.handleFn();
    }

    this.blendMode = Phaser.BlendModes.NORMAL;
  }

  public findChild(id: string, gameObject?: Phaser.GameObjects.GameObject): Phaser.GameObjects.GameObject | undefined {
    const container = (gameObject ?? this) as Container;
    return container.getAll().find((item) => (item as Container).id === id);
  }

  public enableDrag(): void {
    this.setEventInteractive();
    this.scene.input.setDraggable(this);
    this.on('drag', this.onDrag);
  }

  public onDrag(pointer: Phaser.Input.Pointer, dragX: number, dragY: number): void {
    const [clampedX, clampedY] = this.getClampedPosition(dragX, dragY);
    this.setPosition(clampedX, clampedY);
    this.onDragUpdate(pointer, this.x, this.y);
  }

  private getClampedPosition(dragX: number, dragY: number): [number, number] {
    if (this.Type === 'RoundedButton') {
      const radius = this._baseConfig?.radius ?? 0;
      const borderWidth = this._baseConfig?.borderWidth ?? 0;
      const radiusBorderWidth = (radius + borderWidth) * 2;
      return [
        Utils.clampX(dragX, this.scene.scale.width, radiusBorderWidth),
        Utils.clampY(dragY, this.scene.scale.height, radiusBorderWidth)
      ];
    }
    return [
      Utils.clampX(dragX, this.scene.scale.width, this.Width),
      Utils.clampY(dragY, this.scene.scale.height, this.Height)
    ];
  }

  public onDragUpdate(pointer: Phaser.Input.Pointer, dragX: number, dragY: number): void {
    console.log(pointer, dragX, dragY);
  }

  get id(): string {
    return this._id ?? '';
  }

  set id(id: string) {
    this._id = id;
  }

  public RefreshBounds(): void {
    this._bounds = this.getBounds();
  }

  private cacheBounds(): void {
    if (!this._bounds) this.RefreshBounds();
  }

  get Width(): number {
    return (this._baseConfig?.width ?? 0) + (this._baseConfig?.borderWidth ? this._baseConfig?.borderWidth * 2 : 0);
  }

  get Height(): number {
    return (this._baseConfig?.height ?? 0) + (this._baseConfig?.borderWidth ? this._baseConfig?.borderWidth * 2 : 0);
  }

  get RealWidth(): number {
    this.cacheBounds();
    return this._bounds?.width ?? 0;
  }

  get RealHeight(): number {
    this.cacheBounds();
    return this._bounds?.height ?? 0;
  }

  get RealSize(): { width: number; height: number } {
    return { width: this.Width, height: this.Height };
  }

  get Top(): number {
    this.cacheBounds();
    return this._bounds?.top ?? 0;
  }

  get Left(): number {
    this.cacheBounds();
    return this._bounds?.left ?? 0;
  }

  get Right(): number {
    this.cacheBounds();
    return this._bounds?.right ?? 0;
  }

  get Bottom(): number {
    this.cacheBounds();
    return this._bounds?.bottom ?? 0;
  }

  get CenterX(): number {
    this.cacheBounds();
    return this._bounds?.centerX ?? 0;
  }

  get CenterY(): number {
    this.cacheBounds();
    return this._bounds?.centerY ?? 0;
  }

  get X(): number {
    this.cacheBounds();
    return this._bounds?.x ?? 0;
  }

  get Y(): number {
    this.cacheBounds();
    return this._bounds?.y ?? 0;
  }

  get Type(): string {
    return this._type ?? 'Container';
  }

  set Type(type: string) {
    this._type = type;
  }

  public addChild(child: Phaser.GameObjects.GameObject): void {
    if (!this.exists(child)) {
      this.add(child);
    }
  }

  public addChildAt(child: Phaser.GameObjects.GameObject, index?: number): void {
    if (!this.exists(child)) {
      this.addAt(child, index);
    }
  }

  drawBorderLine?: Phaser.GameObjects.Rectangle | Phaser.GameObjects.Arc;

  public debugDrawBorderLine(color?: number): void {
    const borderWidth = this._baseConfig?.borderWidth ?? 0;
    const width = this.getBounds().width + borderWidth * 2;
    const height = this.getBounds().height + borderWidth * 2;

    if (this.drawBorderLine) {
      this.drawBorderLine.destroy(true);
    }

    this.drawBorderLine = this.createDebugBorderLine(width, height, color);
    this.add(this.drawBorderLine);
  }

  private createDebugBorderLine(width: number, height: number, color?: number): Phaser.GameObjects.Rectangle | Phaser.GameObjects.Arc {
    if (this._baseConfig?.geomType === 'Circle') {
      return this.scene.add.circle(0, 0, width / 2, 0x000000, 0.1)
        .setStrokeStyle(4, color ?? 0xa52a2a, 1)
        .setOrigin(0);
    }
    return this.scene.add.rectangle(0, 0, width - 4, height - 4, 0x000000, 0.1)
      .setStrokeStyle(4, color ?? 0xa52a2a, 1)
      .setOrigin(0);
  }

  public debugHitArea(): void {
    this.scene.input.enableDebug(this);
  }

  debug(color?: number): void {
    this.debugDrawBorderLine(color);
    this.debugHitArea();
  }
}

