import { Mai3Game } from '../../dist';
import { getGameConfig } from './config';
import * as scenes from './scenes';

const config = getGameConfig();
const game = Mai3Game.Init(config);
    
Object.entries(scenes).forEach(([key, Scene]) => {
  game.scene.add(key, Scene, key === "Boot");
});