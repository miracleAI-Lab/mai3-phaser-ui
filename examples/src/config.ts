import { TonConfig } from "../../dist/game/TonConfig";

export function getGameConfig() {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#00746b',
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
  };

  return config;
}

type Url = `${string}://${string}`
type Network = 'testnet' | 'mainnet'

export type BackendConfig =
    {
        ok: false
    } |
    {
        ok: true,
        config: {
            network: Network,
            tokenMinter: string,
            tokenRecipient: string,
            achievementCollection: Record<string, string>,
        }
    }

export async function loadTonConfig(): Promise<TonConfig> {
  if (import.meta.env.VITE_NETWORK == null) {
    throw new Error('NETWORK is not set.');
  }
  if (import.meta.env.VITE_API_URL == null) {
    throw new Error('API_URL is not set.');
  }
  if (import.meta.env.VITE_MINI_APP_URL == null) {
    throw new Error('MINI_APP_URL is not set.');
  }
  if (import.meta.env.VITE_TOKEN_MASTER == null) {
    throw new Error('TOKEN_MASTER is not set.');
  }
  if (import.meta.env.VITE_TOKEN_RECIPIENT == null) {
    throw new Error('TOKEN_RECIPIENT is not set.');
  }

  const apiUrl = import.meta.env.VITE_API_URL;
  const miniAppUrl = import.meta.env.VITE_MINI_APP_URL;
  const network = import.meta.env.VITE_NETWORK;
  const tokenMaster = import.meta.env.VITE_TOKEN_MASTER;
  const tokenRecipient = import.meta.env.VITE_TOKEN_RECIPIENT;

  return {
    ENDPOINT: apiUrl,
    APP_URL: miniAppUrl as Url,
    APP_MANIFEST_URL: 'https://raw.githubusercontent.com/ton-defi-org/tonconnect-manifest-temp/main/tonconnect-manifest.json',
    NETWORK: network,
    TOKEN_MASTER: tokenMaster,
    TOKEN_RECIPIENT: tokenRecipient,
    connectWalletButtonConfig: undefined
  }
}
