import { Plugins } from "phaser";
import ObjectFactory from "./ObjectFactory";
import { BaseScene } from "../game";

export class Mai3Plugin extends Phaser.Plugins.ScenePlugin {
  add: ObjectFactory;
  make: ObjectFactory;
  scene: BaseScene;
  
  constructor(scene: BaseScene, pluginManager: Plugins.PluginManager) {
    super(scene, pluginManager, 'mai3');

    this.scene = scene;
    this.add = new ObjectFactory(scene, true);
    this.make = new ObjectFactory(scene, false);
  }

  boot() {
    const eventEmitter = this.scene.events;
    eventEmitter.once('destroy', this.destroy, this);
  }

  destroy() {
    this.add.destroy();
    this.make.destroy();
    super.destroy();
  }
}