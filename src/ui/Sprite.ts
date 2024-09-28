import { BaseScene } from "../game";
import { Container } from './Container';
import { SpriteConfig } from '../types';

export class Sprite extends Container {
  private _config: SpriteConfig;
  public instance?: Phaser.GameObjects.Sprite;

  constructor(scene: BaseScene, config: SpriteConfig) {
    super(scene, config, 'Sprite');
    this._config = config;

    this.reDraw(config);
    this.setEventInteractive();
  }

  reDraw(config: SpriteConfig) {
    this._config = config;
    this._config.width = config.width ?? 0;
    this._config.height = config.height ?? 0;
    const texture = (this._config.key ?? '') as string;

    if (!this.instance)
      this.instance = this.scene.make.sprite(this._config);
    
    this.instance?.setPosition(0, 0);
    this.instance?.setTexture(texture, this._config.frame);
    this.instance?.setDisplaySize(this._config.width, this._config.height);
    this.instance?.setOrigin(0);
    this.addChild(this.instance!);

    this.RefreshBounds();
  }

  destroy(fromScene?: boolean) {
    if (this.instance) {
      this.instance.destroy();
      this.instance = undefined;
    }
    super.destroy(fromScene);
  }
}
