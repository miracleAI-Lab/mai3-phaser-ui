import { ConnectWalletButtonConfig, HandleError, Locale, Wallet, WalletApp } from '../types';
import {
  locales,
} from '../common/consts';
import Utils from '../utils';
import { BaseScene, TonConnectUI } from "../game";
import { BaseButton } from './BaseButton';
import { ImageButton } from './ImageButton';
import { TonConnector } from '../game/TonConnetor';

export class ConnectWalletButton extends BaseButton {
  wallet: Wallet | null = null;
  connector?: TonConnectUI;
  connectionSourceName: WalletApp;
  unsubscribeFromConnector?: () => void;
  locale: Locale;
  button: ImageButton;
  private onError: HandleError;
  private _config: ConnectWalletButtonConfig;

  constructor(scene: BaseScene, config: ConnectWalletButtonConfig) {
    super(scene, config, 'ConnectWalletButton');
    this._config = config;

    this.connectionSourceName = config.walletApp || 'telegram-wallet';
    this.connector = TonConnector.getInstance();
    this.onError = config.onError
      ? config.onError
      : (error) => {
        throw error;
      };

    const { width = 0, height = 0, texture = '' } = this._config;
    this.button = new ImageButton(this.scene, { x: 0, y: 0, width, height, texture });
    this.button.disableInteractive();
    this.add(this.button);

    const locale = locales[config.language ?? 'en'];
    this.locale = locale;

    this.RefreshBounds();
    this.initializeEvents();
    this.updateConfig(this._config);

    const walletChanged = (wallet: Wallet | null) => {
      this.wallet = wallet;
      if (wallet) {
        let address = Utils.rawAddressToFriendly(wallet.account.address, true);
      } else {

      }

      if (config.onWalletChange) {
        config.onWalletChange(wallet);
      }
    };

    this.unsubscribeFromConnector = this.connector?.onStatusChange(walletChanged);
    this.connector?.connectionRestored.then((connected: boolean) => {
      if (!connected) {
        walletChanged(null);
      }
    });
  }

  protected handleUp(): void {
    super.handleUp();
    this.connectWallet();
  }

  protected handleDown(): void {
    super.handleDown();
    this.scene.game.canvas.style.cursor = 'pointer';
  }

  protected handleOut(): void {
    super.handleOut();
    this.scene.game.canvas.style.cursor = 'default';
  }

  protected handleOver(): void {
    super.handleOver();
    this.scene.game.canvas.style.cursor = 'pointer';
  }

  connectWallet = async () => {
    try {
      if (this.connector?.connected) {
        await this.disconnectWallet();
      }
      await this.connector?.openModal();
    } catch (error: any) {
      console.log("connectWallet error", error);
      this.onError(error);
    } finally {

    }
  }

  disconnectWallet = async () => {
    try {
      await this.connector?.disconnect();
    } catch (error: any) {
      console.log("disconnect error", error);
      this.onError(error);
    } finally {

    }
  }

  public destroy(fromScene?: boolean): void {
    this.unsubscribeFromConnector!();
    if (this.button) {
      this.button.destroy(true);
    }
    super.destroy(fromScene);
  }
}