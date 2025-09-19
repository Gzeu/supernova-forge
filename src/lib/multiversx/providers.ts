import {
  ExtensionProvider,
  WalletConnectV2Provider,
  WebWalletProvider,
  HWProvider,
} from '@multiversx/sdk-web-wallet-provider';
import { WALLET_PROVIDERS, WalletProvider, networkConfig } from './config';
import { WALLET_CONNECT_CONFIG } from '@/lib/constants';

// Base Provider Interface
export interface IWalletProvider {
  init(): Promise<boolean>;
  login(): Promise<string>;
  logout(): Promise<boolean>;
  getAddress(): string;
  isInitialized(): boolean;
  isConnected(): boolean;
  signTransactions(transactions: any[]): Promise<any[]>;
  signMessage(message: string): Promise<string>;
}

// Extension Provider (xPortal Browser Extension)
export class SupernovaExtensionProvider implements IWalletProvider {
  private provider: ExtensionProvider | null = null;

  async init(): Promise<boolean> {
    try {
      this.provider = ExtensionProvider.getInstance();
      return await this.provider.init();
    } catch (error) {
      console.error('Extension provider init failed:', error);
      return false;
    }
  }

  async login(): Promise<string> {
    if (!this.provider) throw new Error('Provider not initialized');
    
    const address = await this.provider.login();
    return address;
  }

  async logout(): Promise<boolean> {
    if (!this.provider) return false;
    
    await this.provider.logout();
    return true;
  }

  getAddress(): string {
    return this.provider?.getAddress() || '';
  }

  isInitialized(): boolean {
    return this.provider?.isInitialized() || false;
  }

  isConnected(): boolean {
    return this.provider?.isConnected() || false;
  }

  async signTransactions(transactions: any[]): Promise<any[]> {
    if (!this.provider) throw new Error('Provider not initialized');
    
    return await this.provider.signTransactions(transactions);
  }

  async signMessage(message: string): Promise<string> {
    if (!this.provider) throw new Error('Provider not initialized');
    
    return await this.provider.signMessage({ message });
  }
}

// WalletConnect Provider
export class SupernovaWalletConnectProvider implements IWalletProvider {
  private provider: WalletConnectV2Provider | null = null;

  async init(): Promise<boolean> {
    try {
      this.provider = new WalletConnectV2Provider({
        projectId: WALLET_CONNECT_CONFIG.projectId,
        metadata: WALLET_CONNECT_CONFIG.metadata,
        chainId: networkConfig.chainId,
      });
      
      return await this.provider.init();
    } catch (error) {
      console.error('WalletConnect provider init failed:', error);
      return false;
    }
  }

  async login(): Promise<string> {
    if (!this.provider) throw new Error('Provider not initialized');
    
    const address = await this.provider.login();
    return address;
  }

  async logout(): Promise<boolean> {
    if (!this.provider) return false;
    
    await this.provider.logout();
    return true;
  }

  getAddress(): string {
    return this.provider?.getAddress() || '';
  }

  isInitialized(): boolean {
    return this.provider?.isInitialized() || false;
  }

  isConnected(): boolean {
    return this.provider?.isConnected() || false;
  }

  async signTransactions(transactions: any[]): Promise<any[]> {
    if (!this.provider) throw new Error('Provider not initialized');
    
    return await this.provider.signTransactions(transactions);
  }

  async signMessage(message: string): Promise<string> {
    if (!this.provider) throw new Error('Provider not initialized');
    
    return await this.provider.signMessage({ message });
  }
}

// Web Wallet Provider
export class SupernovaWebWalletProvider implements IWalletProvider {
  private provider: WebWalletProvider | null = null;

  async init(): Promise<boolean> {
    try {
      this.provider = new WebWalletProvider(networkConfig.walletUrl);
      return true;
    } catch (error) {
      console.error('Web wallet provider init failed:', error);
      return false;
    }
  }

  async login(): Promise<string> {
    if (!this.provider) throw new Error('Provider not initialized');
    
    const address = await this.provider.login();
    return address;
  }

  async logout(): Promise<boolean> {
    if (!this.provider) return false;
    
    await this.provider.logout();
    return true;
  }

  getAddress(): string {
    return this.provider?.getAddress() || '';
  }

  isInitialized(): boolean {
    return this.provider?.isInitialized() || false;
  }

  isConnected(): boolean {
    return this.provider?.isConnected() || false;
  }

  async signTransactions(transactions: any[]): Promise<any[]> {
    if (!this.provider) throw new Error('Provider not initialized');
    
    return await this.provider.signTransactions(transactions);
  }

  async signMessage(message: string): Promise<string> {
    if (!this.provider) throw new Error('Provider not initialized');
    
    return await this.provider.signMessage({ message });
  }
}

// Provider Factory
export class WalletProviderFactory {
  static createProvider(type: WalletProvider): IWalletProvider {
    switch (type) {
      case WALLET_PROVIDERS.EXTENSION:
        return new SupernovaExtensionProvider();
      case WALLET_PROVIDERS.WALLET_CONNECT:
        return new SupernovaWalletConnectProvider();
      case WALLET_PROVIDERS.WEB_WALLET:
        return new SupernovaWebWalletProvider();
      default:
        throw new Error(`Unsupported wallet provider: ${type}`);
    }
  }

  static getSupportedProviders(): WalletProvider[] {
    return Object.values(WALLET_PROVIDERS);
  }

  static isProviderAvailable(type: WalletProvider): Promise<boolean> {
    switch (type) {
      case WALLET_PROVIDERS.EXTENSION:
        return Promise.resolve(typeof window !== 'undefined' && 'elrondWallet' in window);
      case WALLET_PROVIDERS.WALLET_CONNECT:
        return Promise.resolve(true);
      case WALLET_PROVIDERS.WEB_WALLET:
        return Promise.resolve(true);
      default:
        return Promise.resolve(false);
    }
  }
}