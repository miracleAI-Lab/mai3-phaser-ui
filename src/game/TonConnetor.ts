import { TonConnectUI } from "@tonconnect/ui";

export class TonConnector {
  private static instance: TonConnectUI;

  public static getInstance(): TonConnectUI {
    if (!this.instance) {
      this.instance = new TonConnectUI({
        manifestUrl: 'https://raw.githubusercontent.com/ton-defi-org/tonconnect-manifest-temp/main/tonconnect-manifest.json',
        uiPreferences: {
          borderRadius: 's'
        }
      });
    }
    return this.instance;
  }

  public static async openModal() {
    const tonConnect = TonConnector.getInstance();
    await tonConnect.openModal()
  }
  
  public static async closeModal() {
    const tonConnect = TonConnector.getInstance();
    await tonConnect.closeModal()
  }

  public static async disconnect() {
    const tonConnect = TonConnector.getInstance();
    await tonConnect.disconnect();
  }

  public static async getWallet() {
    const tonConnect = TonConnector.getInstance();
    return tonConnect.getWallets();
  }

  public static async getAccount() {
    const tonConnect = TonConnector.getInstance();
    return tonConnect.account;
  }

  public static async getAccountAddress() {
    const tonConnect = TonConnector.getInstance();
    return tonConnect.account?.address;
  }
}