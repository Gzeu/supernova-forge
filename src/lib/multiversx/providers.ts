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

// Wallet provider types
export enum WalletProvider {
  EXTENSION = 'extension',
  WEB_WALLET = 'web-wallet',
  WALLET_CONNECT = 'wallet-connect',
  LEDGER = 'ledger',
}

// Interface for wallet providers
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

// Wallet Provider Factory
export class WalletProviderFactory {
  static getSupportedProviders(): WalletProvider[] {
    return [
      WalletProvider.EXTENSION,
      WalletProvider.WEB_WALLET,
      WalletProvider.WALLET_CONNECT,
      WalletProvider.LEDGER,
    ];
  }

  static async isProviderAvailable(provider: WalletProvider): Promise<boolean> {
    switch (provider) {
      case WalletProvider.EXTENSION:
        return typeof window !== 'undefined' && 'elrondWallet' in window;
      case WalletProvider.WEB_WALLET:
        return true; // Always available
      case WalletProvider.WALLET_CONNECT:
        return true; // Always available
      case WalletProvider.LEDGER:
        return typeof navigator !== 'undefined' && 'usb' in navigator;
      default:
        return false;
    }
  }

  static createProvider(provider: WalletProvider): IWalletProvider {
    switch (provider) {
      case WalletProvider.EXTENSION:
        return new MockExtensionProvider();
      case WalletProvider.WEB_WALLET:
        return new MockWebWalletProvider();
      case WalletProvider.WALLET_CONNECT:
        return new MockWalletConnectProvider();
      case WalletProvider.LEDGER:
        return new MockLedgerProvider();
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }
}

// Mock providers for development
class MockExtensionProvider implements IWalletProvider {
  private initialized = false;
  private connected = false;
  private address = '';

  async init(): Promise<boolean> {
    this.initialized = true;
    return true;
  }

  async login(): Promise<string> {
    this.connected = true;
    this.address = 'erd1mock' + Math.random().toString(36).substring(2, 15);
    return this.address;
  }

  async logout(): Promise<boolean> {
    this.connected = false;
    this.address = '';
    return true;
  }

  getAddress(): string {
    return this.address;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  isConnected(): boolean {
    return this.connected;
  }

  async signTransactions(transactions: any[]): Promise<any[]> {
    return transactions; // Mock signing
  }

  async signMessage(message: any): Promise<string> {
    return 'mock_signature_' + Math.random().toString(36);
  }
}

class MockWebWalletProvider extends MockExtensionProvider {}
class MockWalletConnectProvider extends MockExtensionProvider {}
class MockLedgerProvider extends MockExtensionProvider {}

// Default provider configuration
export const PROVIDER_CONFIG = {
  walletConnectV2ProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  webWalletUrl: 'https://wallet.multiversx.com',
  apiUrl: 'https://devnet-api.multiversx.com',
};
