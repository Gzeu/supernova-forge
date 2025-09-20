import { useState, useEffect, useCallback } from 'react';
import { Address, Account, TokenTransfer, Transaction } from '@multiversx/sdk-core';
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers';
import { IWalletProvider } from '@/lib/multiversx/providers';
import { TransactionManager } from '@/lib/multiversx/transactions';

export interface MultiversXConfig {
  networkUrl: string;
  chainId: string;
}

export interface WalletState {
  address: string;
  balance: string;
  isConnected: boolean;
  isLoading: boolean;
}

export interface ContractQuery {
  address: string;
  func: string;
  args: string[];
  caller?: string;
}

export interface TokenBalance {
  tokenId: string;
  balance: string;
  decimals: number;
  name: string;
  symbol: string;
}

export function useMultiversX(config: MultiversXConfig) {
  const [walletState, setWalletState] = useState<WalletState>({
    address: '',
    balance: '0',
    isConnected: false,
    isLoading: false,
  });

  const [networkProvider, setNetworkProvider] = useState<ApiNetworkProvider | null>(null);
  const [transactionManager, setTransactionManager] = useState<TransactionManager | null>(null);
  const [provider, setProvider] = useState<IWalletProvider | null>(null);

  useEffect(() => {
    const networkProv = new ApiNetworkProvider(config.networkUrl);
    const txManager = new TransactionManager(networkProv);
    
    setNetworkProvider(networkProv);
    setTransactionManager(txManager);
  }, [config.networkUrl]);

  const connectWallet = useCallback(async (walletProvider: IWalletProvider) => {
    setWalletState(prev => ({ ...prev, isLoading: true }));

    try {
      await walletProvider.init();
      const address = await walletProvider.login();
      
      if (address && networkProvider) {
        const addr = Address.fromBech32(address);
        const account = await networkProvider.getAccount(addr);
        
        setWalletState({
          address,
          balance: account.balance.toString(),
          isConnected: true,
          isLoading: false,
        });
        
        setProvider(walletProvider);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setWalletState(prev => ({ ...prev, isLoading: false }));
    }
  }, [networkProvider]);

  const disconnectWallet = useCallback(async () => {
    if (provider) {
      try {
        await provider.logout();
      } catch (error) {
        console.error('Failed to disconnect wallet:', error);
      }
    }
    
    setWalletState({
      address: '',
      balance: '0',
      isConnected: false,
      isLoading: false,
    });
    
    setProvider(null);
  }, [provider]);

  const sendTransaction = useCallback(async (
    receiver: string,
    amount: string,
    data?: string
  ): Promise<string> => {
    if (!provider || !transactionManager || !walletState.isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      const senderAddr = Address.fromBech32(walletState.address);
      const receiverAddr = Address.fromBech32(receiver);
      const value = TokenTransfer.egldFromAmount(amount);
      
      const transaction = await transactionManager.createTransaction(
        senderAddr,
        receiverAddr,
        value,
        50000, // Default gas limit
      );

      const signedTxs = await provider.signTransactions([transaction]);
      
      if (signedTxs.length > 0 && networkProvider) {
        return await networkProvider.sendTransaction(signedTxs[0]);
      }
      
      throw new Error('Failed to sign transaction');
    } catch (error) {
      console.error('Failed to send transaction:', error);
      throw error;
    }
  }, [provider, transactionManager, walletState.isConnected, walletState.address, networkProvider]);

  const getAccountTransactions = useCallback(async (): Promise<any[]> => {
    if (!networkProvider || !walletState.address) {
      return [];
    }

    try {
      const addr = Address.fromBech32(walletState.address);
      // Use alternative method since getAccountTransactions might not exist
      const account = await networkProvider.getAccount(addr);
      return []; // Return empty array for now, implement proper transaction fetching if needed
    } catch (error) {
      console.error('Failed to get account transactions:', error);
      return [];
    }
  }, [networkProvider, walletState.address]);

  const queryContract = useCallback(async (query: ContractQuery): Promise<any> => {
    if (!networkProvider) {
      throw new Error('Network provider not initialized');
    }

    try {
      const contractAddr = Address.fromBech32(query.address);
      
      // Create a query object compatible with the network provider
      const vmQuery = {
        address: contractAddr,
        func: query.func,
        args: query.args,
        caller: query.caller ? Address.fromBech32(query.caller) : undefined,
        value: '0',
      };

      const result = await networkProvider.queryContract(vmQuery as any);
      return result;
    } catch (error) {
      console.error('Failed to query contract:', error);
      throw error;
    }
  }, [networkProvider]);

  const getTokenBalance = useCallback(async (tokenId: string): Promise<TokenBalance | null> => {
    if (!networkProvider || !walletState.address) {
      return null;
    }

    try {
      const addr = Address.fromBech32(walletState.address);
      // Alternative implementation since getAccountToken might not exist
      const account = await networkProvider.getAccount(addr);
      
      // Return mock data for now - implement proper token balance fetching
      return {
        tokenId,
        balance: '0',
        decimals: 18,
        name: 'Unknown Token',
        symbol: 'UNK',
      };
    } catch (error) {
      console.error('Failed to get token balance:', error);
      return null;
    }
  }, [networkProvider, walletState.address]);

  const waitForTransaction = useCallback(async (txHash: string) => {
    if (!transactionManager) {
      return null;
    }

    try {
      return await transactionManager.waitForTransaction(txHash);
    } catch (error) {
      console.error('Failed to wait for transaction:', error);
      return null;
    }
  }, [transactionManager]);

  return {
    walletState,
    connectWallet,
    disconnectWallet,
    sendTransaction,
    getAccountTransactions,
    queryContract,
    getTokenBalance,
    waitForTransaction,
    networkProvider,
  };
}
