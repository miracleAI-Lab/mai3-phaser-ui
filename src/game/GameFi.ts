import { GameFiBase as GameFiBase, GameFiInitializationParams } from '../common/game-fi';
import { ConnectWalletButtonConfig } from '../types';
import BaseScene from './BaseScene';
import { TonConfig } from './TonConfig';
import { WalletConnectorParams } from '../common/interfaces';
import { ConnectWalletButton } from '../ui';
import { TonConnector } from './TonConnetor';
export class GameFi extends GameFiBase {
  static config: TonConfig;
  public connectWalletButton?: ConnectWalletButton;

  public static async create(scene: BaseScene, config: TonConfig): Promise<GameFi> {
    if (!config || !config.NETWORK) {
      throw new Error('TonConfig is not defined');
    }

    this.config = config;
    const connectorParams: WalletConnectorParams = {
      manifestUrl: config.APP_MANIFEST_URL,
      actionsConfiguration: {
        // twaReturnUrl is for Telegram Mini Apps
        // use returnStrategy: 'https://yourapp.com' otherwise
        twaReturnUrl: config.APP_URL
      }
    };

    const gameFiParams: GameFiInitializationParams = {
      network: config.NETWORK,
      contentResolver: {
        // use urlProxy if you you are going to use methods like:
        // getNftCollection, getNftItem, etc.
        urlProxy: `${config.ENDPOINT}/fix-cors?url=%URL%`
      },
      merchant: {
        // in-game jetton purchases come to this address
        jettonAddress: config.TOKEN_MASTER,
        // in-game TON purchases come to this address
        tonAddress: config.TOKEN_RECIPIENT
      }
    }

    const connector = await TonConnector.init(connectorParams);
    const params = {
      ...gameFiParams,
      connector: connector
    }

    let gameFi = new GameFi(await GameFi.createDependencies(params));
    if (scene && config.connectWalletButtonConfig) {
      this._createConnectButton(scene, config.connectWalletButtonConfig);
    }

    return gameFi;
  }

  private static _createConnectButton(scene: BaseScene, config: ConnectWalletButtonConfig): ConnectWalletButton {
    config.manifestUrl = this.config.APP_MANIFEST_URL;
    config.appUrl = this.config.APP_URL;
    return scene.mai3.add.connectWalletButton(config);
  }

  public createConnectButton(scene: BaseScene, config: ConnectWalletButtonConfig): ConnectWalletButton {
    this.connectWalletButton = GameFi._createConnectButton(scene, config);
    return this.connectWalletButton;
  }

  public getShortAddress() {
    return this.connectWalletButton?.getShortAddress();
  }

  public getFullAddress() {
    return this.connectWalletButton?.getFullAddress();
  }
}
