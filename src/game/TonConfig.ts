import { ConnectWalletButtonConfig } from "../types"

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


export interface TonConfig {
    ENDPOINT: string;
    APP_URL: Url;
    APP_MANIFEST_URL: string;
    NETWORK: Network;
    TOKEN_MASTER: string;
    TOKEN_RECIPIENT: string;
    connectWalletButtonConfig?: ConnectWalletButtonConfig;
}