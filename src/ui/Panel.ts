import { Container } from './Container';
import { PanelConfig } from '../types';
import Utils from '../utils';
import { BaseScene } from "../game";

export class Panel extends Container {
  protected bg?: Phaser.GameObjects.RenderTexture | Phaser.GameObjects.NineSlice;
  protected _config?: PanelConfig;

  constructor(scene: BaseScene, config: PanelConfig) {
    super(scene, config);
    this._config = config;
    this.Type = 'Panel';
  }

  public render() {
    this.drawBg();
  }

  public reDraw(config: PanelConfig) {
    this._config = config;
    this.drawBg();
  }

  protected drawBg() {
    this.RefreshBounds();
    this._config!.width = Utils.GetOrDefaultValue(this._config?.width, this.RealWidth);
    this._config!.height = Utils.GetOrDefaultValue(this._config?.height, this.RealHeight);
    const radius = this._config?.radius ?? 10;
    const borderWidth = this._config?.borderWidth ?? 4;
    const borderColor = this._config?.borderColor ?? 0xff8221;
    const paddingLeft = this._config?.padding?.x ?? this._config?.padding?.left ?? 0;
    const paddingRight = this._config?.padding?.x ?? this._config?.padding?.right ?? 0;
    const paddingTop = this._config?.padding?.y ?? this._config?.padding?.top ?? 0;
    const paddingBottom = this._config?.padding?.y ?? this._config?.padding?.bottom ?? 0;
    this._config!.width! += (paddingLeft + paddingRight);
    this._config!.height! += (paddingTop + paddingBottom);

    if (Utils.isNullOrZeroOrEmpty(this._config?.texture)) {
      if (this.bg && !(this.bg instanceof Phaser.GameObjects.RenderTexture)) {
        this.bg?.destroy();
        this.bg = undefined;
      }
      
      const newBg = Utils.reDrawRoundedRectRenderTexture(this.scene, this.bg as Phaser.GameObjects.RenderTexture, 0, 0, this._config?.width, this._config?.height, borderWidth, radius, borderColor, this._config?.backgroundColor, this._config?.backgroundAlpha);
      if (newBg) {
        this.bg = newBg;
      }
    } else {
      if (this.bg && !(this.bg instanceof Phaser.GameObjects.NineSlice)) {
        this.bg?.destroy();
        this.bg = undefined;
      }

      if (!this.bg) {
        const cfg = { key: this._config?.texture ?? '', frame: this._config?.frame };
        this.bg = this.scene.make.nineslice(cfg);
      }

      const bg = (this.bg as Phaser.GameObjects.NineSlice);
      bg.setTexture(this._config?.texture ?? '', this._config?.frame);
      bg.setDisplaySize(this._config?.width ?? 0, this._config?.height ?? 0);
      bg.setOrigin(0);
    }

    this.addChildAt(this.bg!, 0);
  }

  reSize(width: number, height: number) {
    this._config!.width = width;
    this._config!.height = height;
    this.reDraw(this._config!);
  }
  
  get config(): PanelConfig {
    return this._config!;
  }

  destroy(fromScene?: boolean) {
    if (this.bg) {
      this.bg.destroy();
      this.bg = undefined;
    }
    super.destroy(fromScene);
  }

}