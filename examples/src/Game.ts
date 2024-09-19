import { Mai3Plugin } from '../../src/ui/Mai3Plugin';
import * as scenes from './scenes';

export default class Game {
  Run() {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.CANVAS,
      backgroundColor: 0xffffff,
      scale: {
        width: 960,
        height: 1280,
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
      },
    };

    const game = new Phaser.Game(config);

    Object.entries(scenes).forEach(([key, Scene]) => {
      game.scene.add(key, Scene, key === "Boot");
    });

    return game;
  }
}
