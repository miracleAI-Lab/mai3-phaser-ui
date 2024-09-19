import * as scenes from './scenes';
import { Mai3Plugin } from './mai3/gui/Mai3Plugin';

export default class Game {
  Run() {
    console.log("window", window.innerWidth, window.innerHeight)
    let width = 960
    let height = 1280
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.CANVAS,
      backgroundColor: 0xffffff,
      scale: {
        width: width,
        height: height,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
      },
      dom: {
        createContainer: true
      },
      parent: 'root',
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
          gravity: { x: 0, y: 0 }
        }
      },
      plugins: {
        scene: [
          { key: 'Mai3Plugin', plugin: Mai3Plugin, mapping: 'mai3' },
        ],
        // global: [{
        //   key: 'rexVirtualJoystickPlugin',
        //   plugin: VirtualJoystickPlugin,
        //   start: true
        // },]
      },
    };

    const game = new Phaser.Game(config);
    // SCENES
    Object.entries(scenes).forEach(([key, Scene]) => {
      console.log(`${key}, ${Scene}`);
      game.scene.add(key, Scene, key === "Boot");
    });

    return game;
  }
}
