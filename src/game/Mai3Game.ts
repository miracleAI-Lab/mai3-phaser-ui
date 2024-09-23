import Phaser from 'phaser';
import { Mai3Plugin } from '../plugins/Mai3Plugin';

class Mai3Game extends Phaser.Game {

  constructor(GameConfig?: Phaser.Types.Core.GameConfig) {
    super(GameConfig);
  }

  static Init(GameConfig?: Phaser.Types.Core.GameConfig): Mai3Game {
    const game = new Mai3Game(GameConfig);
    game.plugins.installScenePlugin('Mai3Plugin', Mai3Plugin, 'mai3');
    return game;
  }
}

export default Mai3Game;
