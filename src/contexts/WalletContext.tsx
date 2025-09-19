'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { WalletProviderFactory, IWalletProvider, WalletProvider } from '@/lib/multiversx/providers';
import { WALLET_PROVIDERS } from '@/lib/multiversx/config';
import { WalletInfo } from '@/types/multiversx';

// Wallet State
interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  address: string;
  balance: string;
  provider: WalletProvider | null;
  walletProvider: IWalletProvider | null;
  error: string | null;
  supportedProviders: WalletProvider[];
}

// Initial State
const initialState: WalletState = {
  isConnected: false,
  isConnecting: false,
  address: '',
  balance: '0',
  provider: null,
  walletProvider: null,
  error: null,
  supportedProviders: [],
};

// Actions
type WalletAction =
  | { type: 'SET_CONNECTING'; payload: boolean }
  | { type: 'SET_CONNECTED'; payload: { address: string; provider: WalletProvider; walletProvider: IWalletProvider } }
  | { type: 'SET_DISCONNECTED' }
  | { type: 'SET_BALANCE'; payload: string }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_SUPPORTED_PROVIDERS'; payload: WalletProvider[] };

// Reducer
function walletReducer(state: WalletState, action: WalletAction): WalletState {
  switch (action.type) {
    case 'SET_CONNECTING':
      return { ...state, isConnecting: action.payload, error: null };
    
    case 'SET_CONNECTED':
      return {
        ...state,
        isConnected: true,
        isConnecting: false,
        address: action.payload.address,
        provider: action.payload.provider,
        walletProvider: action.payload.walletProvider,
        error: null,
      };
    
    case 'SET_DISCONNECTED':
      return {
        ...state,
        isConnected: false,
        isConnecting: false,
        address: '',
        balance: '0',
        provider: null,
        walletProvider: null,
        error: null,
      };
    
    case 'SET_BALANCE':
      return { ...state, balance: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isConnecting: false };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    case 'SET_SUPPORTED_PROVIDERS':
      return { ...state, supportedProviders: action.payload };
    
    default:
      return state;
  }
}

// Context
interface WalletContextType extends WalletState {
  connectWallet: (provider: WalletProvider) => Promise<void>;
  disconnectWallet: () => Promise<void>;
  refreshBalance: () => Promise<void>;
  signMessage: (message: string) => Promise<string>;
  clearError: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Provider Component
interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  // Check supported providers on mount
  useEffect(() => {
    const checkSupportedProviders = async () => {
      const providers = WalletProviderFactory.getSupportedProviders();
      const supportedProviders: WalletProvider[] = [];

      for (const provider of providers) {
        const isAvailable = await WalletProviderFactory.isProviderAvailable(provider);
        if (isAvailable) {
          supportedProviders.push(provider);
        }
      }

      dispatch({ type: 'SET_SUPPORTED_PROVIDERS', payload: supportedProviders });
    };

    checkSupportedProviders();
  }, []);

  // Connect wallet
  const connectWallet = async (providerType: WalletProvider) => {
    try {
      dispatch({ type: 'SET_CONNECTING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      const walletProvider = WalletProviderFactory.createProvider(providerType);
      
      // Initialize provider
      const initialized = await walletProvider.init();
      if (!initialized) {
        throw new Error('Failed to initialize wallet provider');
      }

      // Login
      const address = await walletProvider.login();
      if (!address) {
        throw new Error('Failed to get wallet address');
      }

      dispatch({
        type: 'SET_CONNECTED',
        payload: {
          address,
          provider: providerType,
          walletProvider,
        },
      });

      // Refresh balance after connection
      await refreshBalance();
      
      // Store connection info in localStorage
      localStorage.setItem('wallet_provider', providerType);
      localStorage.setItem('wallet_address', address);
      
    } catch (error) {
      console.error('Wallet connection failed:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to connect wallet' 
      });
    }
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    try {
      if (state.walletProvider) {
        await state.walletProvider.logout();
      }
      
      dispatch({ type: 'SET_DISCONNECTED' });
      
      // Clear localStorage
      localStorage.removeItem('wallet_provider');
      localStorage.removeItem('wallet_address');
      
    } catch (error) {
      console.error('Wallet disconnection failed:', error);
      dispatch({ type: 'SET_DISCONNECTED' }); // Disconnect anyway
    }
  };

  // Refresh balance
  const refreshBalance = async () => {
    if (!state.address || !state.walletProvider) return;

    try {
      // In a real implementation, fetch balance from API
      // For now, using placeholder
      const balance = '0.00 EGLD';
      dispatch({ type: 'SET_BALANCE', payload: balance });
    } catch (error) {
      console.error('Failed to refresh balance:', error);
    }
  };

  // Sign message
  const signMessage = async (message: string): Promise<string> => {
    if (!state.walletProvider) {
      throw new Error('Wallet not connected');
    }

    try {
      return await state.walletProvider.signMessage(message);
    } catch (error) {
      console.error('Message signing failed:', error);
      throw error;
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Auto-reconnect on page load
  useEffect(() => {
    const autoReconnect = async () => {
      const savedProvider = localStorage.getItem('wallet_provider') as WalletProvider;
      const savedAddress = localStorage.getItem('wallet_address');
      
      if (savedProvider && savedAddress) {
        try {
          await connectWallet(savedProvider);
        } catch (error) {
          console.error('Auto-reconnect failed:', error);
          // Clear invalid stored data
          localStorage.removeItem('wallet_provider');
          localStorage.removeItem('wallet_address');
        }
      }
    };

    // Only auto-reconnect if we have supported providers
    if (state.supportedProviders.length > 0) {
      autoReconnect();
    }
  }, [state.supportedProviders]);

  const value: WalletContextType = {
    ...state,
    connectWallet,
    disconnectWallet,
    refreshBalance,
    signMessage,
    clearError,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

// Hook
export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}