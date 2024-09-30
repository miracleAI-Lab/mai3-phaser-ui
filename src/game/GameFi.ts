import type Phaser from 'phaser';
import { ConnectWalletButton } from '../ui/ConnectWalletButton';
import { GameFiBase as GameFiBase, GameFiInitializationParams } from '../common/game-fi';
import { ConnectWalletButtonConfig } from '../types';
import BaseScene from './BaseScene';

export class GameFi extends GameFiBase {
  /**
   * Setups and creates GameFi instance.
   * The instance provides all the needed functionality via various methods.
   */
  public static async create(params: GameFiInitializationParams = {}): Promise<GameFi> {
    return new GameFi(await GameFi.createDependencies(params));
  }

  /**
   * Creates the connect button as `ConnectWalletButton` instance and adds it to the passed scene.
   * `ConnectWalletButton` is child class of `Phaser.GameObjects.Container`.
   * It's possible to interact with the button using Container API, like changing position `setPosition`.
   */
  public createConnectButton(scene: BaseScene, config: ConnectWalletButtonConfig) {
    return new ConnectWalletButton(scene, config);
  }
}
