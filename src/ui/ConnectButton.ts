import { BaseScene, TonConnectUI } from "../game";
import { Container } from './Container';
import { ConnectWalletButtonConfig, Locale } from '../types';
import { Wallet, WalletApp } from '../common/interfaces';
import {
  locales,
} from '../common/consts'
// import {loadIcons} from './connect-button/icons';
import Utils from '../utils';
import { BaseButton } from "./BaseButton";

interface HandleError {
    (error: Error | unknown): void;
}
  
export class ConnectButton extends BaseButton {
    private _config: ConnectWalletButtonConfig;
    public image?: Phaser.GameObjects.NineSlice;
    label?: Phaser.GameObjects.Text;

    locale: Locale;
    wallet: Wallet | null = null;
    connector: TonConnectUI;
    connectionSourceName: WalletApp;
    unsubscribeFromConnector: () => void;
    changeIconTimer: NodeJS.Timeout | number | null = null;
    private onError: HandleError;
    
    constructor(scene: BaseScene, config: ConnectWalletButtonConfig) {
        super(scene, config, 'ConnectButton');
        this._config = config;

        const locale = locales[config.language ?? 'en'];
        this.locale = locale;
        this.onError = this.config.onError
            ? this.config.onError
            : (error) => {
                throw error;
            };

        this.connectionSourceName = 'telegram-wallet';
        this.connector = new TonConnectUI({
            manifestUrl: 'https://raw.githubusercontent.com/ton-defi-org/tonconnect-manifest-temp/main/tonconnect-manifest.json',
            uiPreferences: {
                borderRadius: 's'
            }
        })

        this.reDraw(config);
        this.setEventInteractive();

        const walletChanged = (wallet: Wallet | null) => {
            this.wallet = wallet;
            if (wallet) {
                console.log('address: ', wallet.account.address);
                this.label?.setText(Utils.rawAddressToFriendly(wallet.account.address, true));
            } else {
                this.label?.setText(locale.connectWallet);
            }
      
            if (this.config.onWalletChange) {
                this.config.onWalletChange(wallet);
            }
        };
        
        this.unsubscribeFromConnector = this.connector.onStatusChange(walletChanged);
        this.connector.connectionRestored.then((connected) => {
            if (!connected) {
                walletChanged(null);
            }

            this.enable();
        });
    }

    reDraw(config: ConnectWalletButtonConfig) {
        this._config = config;
        this._config.width = config.width ?? 200;
        this._config.height = config.height ?? 60;
        const {width, height, texture = '', frame, text = 'Connect Wallet', textStyle = {}} = this._config;

        if (!this.image)
            this.image = this.scene.add.nineslice(0, 0, texture, frame);
        
        this.image?.setTexture(texture, frame);
        this.image?.setDisplaySize(width, height);
        this.image?.setOrigin(0);
        this.addChildAt(this.image!, 0);

        if (!this.label)
            this.label = this.scene.make.text({});

        this.label.setText(text);
        this.label.setStyle(textStyle);
        this.label.setFontStyle(config.textStyle?.fontStyle!);
        this.label.setPadding(config.textStyle?.padding ?? {});
        this.label.setOrigin(0);
        this.addChildAt(this.label, 1);

        const x = (width - this.label?.displayWidth!) / 2
        const y = (height - this.label?.displayHeight!) / 2;
        this.label?.setPosition(x, y);

        this.RefreshBounds();
        this.setEventInteractive();
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
        Utils.smoothScale(this.scene.tweens, this, 1.02, 125);
    }

    connectWallet = async () => {
        try {
            this.disable();
            if (this.connector.connected) {
                await this.disconnectWallet();
            }
            await this.connector.openModal();
        } catch (error: any) {
            console.log("connectWallet error", error);
            this.onError(error);
        } finally {
            this.enable();
        }
    }
    
    disconnectWallet = async () => {
        try {
            this.disable();
            await this.connector.disconnect();
        } catch (error: any) {
            console.log("disconnect error", error);
            this.onError(error);
        } finally {
              this.enable();
        }
    }

    enable() {
        this.setActive(true);
    }

    disable() {
        this.setActive(false);
    }

    get config(): ConnectWalletButtonConfig {
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
