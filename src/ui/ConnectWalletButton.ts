import {ConnectWalletButtonConfig, HandleError, Locale, Wallet, WalletApp} from '../types';
import { DropdownMenu, DropdownMenuItem } from './DropdownMenu';
import {
  buttonDesign,
  locales,
  DARK_COPY,
  DARK_DISCONNECT,
  LIGHT_COPY,
  LIGHT_DISCONNECT
} from '../common/consts';
import Utils from '../utils';
import { loadIcons } from '../common/icons';
import { BaseScene, TonConnectUI } from "../game";
import { Container } from './Container';
import { BaseButton } from './BaseButton';
import { TonConnector } from '../game/TonConnetor';

export class ConnectWalletButton extends BaseButton {
  buttonContainer: Container;
  buttonBackground: Phaser.GameObjects.RenderTexture;
  buttonText: Phaser.GameObjects.Text;
  buttonIcon?: Phaser.GameObjects.Image;
  buttonWidth: number;
  buttonHeight: number;
  wallet: Wallet | null = null;
  connector?: TonConnectUI;
  connectionSourceName: WalletApp;
  unsubscribeFromConnector?: () => void;
  dropdownMenu?: DropdownMenu;
  locale: Locale;
  currentIcon: string;
  changeIconTimer: number | null = null;
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
    
    this.buttonContainer = new Container(scene, {});
    this.loadAssets(scene);

    const locale = locales[config.language ?? 'en'];
    this.locale = locale;
    const styleSchema = config.style === 'dark' ? buttonDesign.dark : buttonDesign.light;
    const backgroundColor =
      config.style === 'dark'
        ? Utils.hexToNumber(styleSchema.backgroundColor)
        : Utils.hexToNumber(styleSchema.backgroundColor);

    const textObject = scene.add.text(
      buttonDesign.horizontalPadding + buttonDesign.icon.width,
      buttonDesign.verticalPadding,
      locale.connectWallet,
      {
        color: styleSchema.fontColor,
        fontFamily: buttonDesign.fontFamily,
        fontSize: buttonDesign.fontSize
      }
    );
    textObject.setOrigin(0);
    this.buttonText = textObject;

    const textWidth = textObject.width;
    const textHeight = textObject.height;
    const buttonWidth =
      textWidth +
      buttonDesign.horizontalPadding * 2 +
      buttonDesign.icon.width +
      buttonDesign.icon.horizontalPadding;
    const buttonHeight = textHeight + buttonDesign.verticalPadding * 2;

    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this._config.width = buttonWidth;
    this._config.height = buttonHeight;
    this.currentIcon = styleSchema.icons.diamond;
    const button = scene.add.graphics({
      x: 0,
      y: 0,
      fillStyle: {
        color: this.wallet == null ? Utils.hexToNumber(styleSchema.backgroundColor) : backgroundColor
      },
      lineStyle: { width: buttonDesign.borderWidth, color: Utils.hexToNumber(styleSchema.borderColor) }
    });
    button.fillRoundedRect(0, 0, buttonWidth, buttonHeight, buttonDesign.borderRadius);
    button.strokeRoundedRect(0, 0, buttonWidth, buttonHeight, buttonDesign.borderRadius);
    const buttonRt = scene.add.renderTexture(0, 0, buttonWidth, buttonHeight);
    buttonRt.draw(button);
    buttonRt.setOrigin(0);
    button.destroy();

    this.buttonBackground = buttonRt;
    this.RefreshBounds();
    this.initializeEvents();
    this.updateConfig(this._config);

    const walletChanged = (wallet: Wallet | null) => {
      this.wallet = wallet;
      if (wallet) {
        textObject.setText(Utils.rawAddressToFriendly(wallet.account.address, true));
        this.setSchema(styleSchema);
      } else {
        textObject.setText(locale.connectWallet);
        this.setSchema(buttonDesign.default);
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

      this.enable();
    });
  }

  private async loadAssets(scene: BaseScene): Promise<void> {
    await loadIcons(scene.textures);

    const icon = scene.add.image(0, 0, this.currentIcon);
    this.buttonIcon = icon;
    this.buttonIcon.setOrigin(0);
    this.buttonIcon.setPosition(
      buttonDesign.horizontalPadding - buttonDesign.icon.horizontalPadding,
      this.buttonHeight * 0.5 - icon.displayHeight * 0.5);

    this.dropdownMenu = new DropdownMenu(
      scene,
      {
        x: 0, 
        y: this.buttonHeight + buttonDesign.dropDown.topMargin,
        style: this._config.style ?? 'light',
        items: [
          {
            icon: this._config.style === 'dark' ? DARK_COPY : LIGHT_COPY,
            text: this.locale.copyAddress,
            onClick: this.copyAddress
          },
          {
            icon: this._config.style === 'dark' ? DARK_DISCONNECT : LIGHT_DISCONNECT,
            text: this.locale.disconnectWallet,
            onClick: () => {
              this.toggleDropdownMenu();
              this.disconnectWallet();
            }
          }
        ]
      }
    );
    this.dropdownMenu.setVisible(false);

    this.buttonContainer.add([this.buttonBackground, this.buttonIcon, this.buttonText]);
    this.add([this.buttonContainer, this.dropdownMenu]);
    scene.add.existing(this);
  }

  private changeIcon(icon: string) {
    this.cancelIconChange();

    if (this.buttonIcon) {
      this.currentIcon = icon;
      this.buttonIcon.setTexture(icon);
    } else {
      this.changeIconTimer = window.setTimeout(() => {
        this.changeIcon(icon);
      }, 4);
    }
  }

  private cancelIconChange() {
    if (this.changeIconTimer != null) {
      window.clearTimeout(this.changeIconTimer);
      this.changeIconTimer = null;
    }
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
    const styleSchema = this._config.style === 'dark' ? buttonDesign.dark : buttonDesign.light;
    if (this.wallet != null) {
      this.repaintButtonBackground(styleSchema.backgroundColor, styleSchema.borderColor);
    }
  }

  protected handleOver(): void {
    super.handleOver();

    this.scene.game.canvas.style.cursor = 'pointer';
    const styleSchema = this._config.style === 'dark' ? buttonDesign.dark : buttonDesign.light;
    if (this.wallet != null) {
      this.repaintButtonBackground(styleSchema.backgroundColorHover, styleSchema.borderColor);
    }
  }

  connectWallet = async () => {
    try {
      this.disable();
      if (this.connector?.connected) {
        await this.disconnectWallet();
      }
      await this.connector?.openModal();
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
      await this.connector?.disconnect();
    } catch (error: any) {
      console.log("disconnect error", error);
      this.onError(error);
    } finally {
      this.enable();
    }
  }

  private copyAddress = async (item: DropdownMenuItem) => {
    if (this.wallet == null) {
      return;
    }

    try {
      await navigator.clipboard.writeText(Utils.rawAddressToFriendly(this.wallet.account.address));
      const oldText = item.text.text;
      item.text.setText(this.locale.addressCopied);
      setTimeout(() => {
        try {
          item.text.setText(oldText);
        } catch (error) {
          // ignore in case the object was destroyed by leaving the scene
        }
      }, 500);
    } catch (error) {
      this.onError(error);
    }
  };

  private disable() {
    this.setInteractive(false);
  }

  private enable() {
    this.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, this.buttonWidth, this.buttonHeight),
      Phaser.Geom.Rectangle.Contains
    );
  }

  private toggleDropdownMenu = () => {
    if (this.dropdownMenu == null) {
      return;
    }

    this.dropdownMenu.setVisible(!this.dropdownMenu.visible);
  };

  private setSchema(schema: typeof buttonDesign.dark) {
    this.repaintButtonBackground(schema.backgroundColor, schema.borderColor);
    this.changeIcon(schema.icons.diamond);
    this.buttonText.setColor(schema.fontColor);
  }

  private repaintButtonBackground(backgroundColor: string, borderColor: string) {
    this.buttonBackground.clear();
    const background = this.scene.add.graphics();
    background.fillStyle(Utils.hexToNumber(backgroundColor));
    background.lineStyle(buttonDesign.borderWidth, Utils.hexToNumber(borderColor));
    background.fillRoundedRect(
      0,
      0,
      this.buttonWidth,
      this.buttonHeight,
      buttonDesign.borderRadius
    );
    background.strokeRoundedRect(
      0,
      0,
      this.buttonWidth,
      this.buttonHeight,
      buttonDesign.borderRadius
    );

    this.buttonBackground.clear();
    this.buttonBackground.draw(background);
    this.buttonBackground.setOrigin(0);
    background.destroy();
  }

  public override destroy() {
    this.unsubscribeFromConnector!();
    this.cancelIconChange();
    if (this.buttonContainer) {
      this.buttonContainer.removeAllListeners();
      this.buttonContainer.destroy();
    }
    if (this.buttonBackground) {
      this.buttonBackground.destroy();
    }
    if (this.buttonText) {
      this.buttonText.destroy();
    }
    if (this.buttonIcon) {
      this.buttonIcon.destroy();
    }
    if (this.dropdownMenu) {
      this.dropdownMenu.destroy();
    }
    super.destroy();
  }
}
