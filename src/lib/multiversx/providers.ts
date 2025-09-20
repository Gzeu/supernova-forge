import { ApiNetworkProvider } from '@multiversx/sdk-network-providers';
import { WalletProvider } from '@multiversx/sdk-web-wallet-provider';
import { WalletConnectV2Provider } from '@multiversx/sdk-wallet-connect-provider';
import { ExtensionProvider } from '@multiversx/sdk-extension-provider';
import { HWProvider } from '@multiversx/sdk-hw-provider';

// Export providers with proper naming
export {
  ApiNetworkProvider,
  WalletProvider as WebWalletProvider,
  WalletConnectV2Provider,
  ExtensionProvider,
  HWProvider,
};

// Create provider instances
export const createApiNetworkProvider = (url: string) => {
  return new ApiNetworkProvider(url);
};

export const createWalletProvider = (walletUrl: string) => {
  return new WalletProvider(walletUrl);
};

// Types for providers
export interface IWalletProvider {
  init(): Promise<boolean>;
  login(): Promise<string>;
  logout(): Promise<boolean>;
  getAddress(): string;
  isInitialized(): boolean;
  isConnected(): boolean;
  signTransactions(transactions: any[]): Promise<any[]>;
  signMessage(message: any): Promise<string>;
}

// Default provider configuration
export const PROVIDER_CONFIG = {
  walletConnectV2ProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  webWalletUrl: 'https://wallet.multiversx.com',
  apiUrl: 'https://devnet-api.multiversx.com',
};
