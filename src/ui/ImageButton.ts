import { BaseScene } from "../game";
import { ImageButtonConfig } from '../types';
import { BaseButton } from "./BaseButton";

export class ImageButton extends BaseButton {
  private _config: ImageButtonConfig;
  public image?: Phaser.GameObjects.NineSlice;

  constructor(scene: BaseScene, config: ImageButtonConfig) {
    config.width = config.width ?? 200;
    config.height = config.height ?? 60;
    super(scene, config, "ImageButton");
    this._config = config;

    this.reDraw(config);
    this.setEventInteractive();
  }

  reDraw(config: ImageButtonConfig) {
    this._config = config;
    if (!this.image)
      this.image = this.scene.add.nineslice(
        0, 0,
        this._config.texture ?? "",
        this._config.frame,
        this._config.width,
        this._config.height,
        this._config.leftWidth,
        this._config.rightWidth,
        this._config.topHeight,
        this._config.bottomHeight
      );

    this.image?.setOrigin(0);
    this.addChild(this.image!);

    this.RefreshBounds();
    this.updateConfig(config);
  }

  get config(): ImageButtonConfig {
    return this._config!;
  }

  destroy(fromScene?: boolean) {
    if (this.image) {
      this.image.destroy();
      this.image = undefined;
    }
    super.destroy(fromScene);
  }
}
