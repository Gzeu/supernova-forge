'use client';

import { useState, useEffect, useCallback } from 'react';
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers';
import { networkConfig } from '@/lib/multiversx/config';
import { useWallet } from '@/contexts/WalletContext';

// Account Info Hook
export function useAccount(address?: string) {
  const { address: walletAddress } = useWallet();
  const [account, setAccount] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const targetAddress = address || walletAddress;

  const fetchAccount = useCallback(async () => {
    if (!targetAddress) return;

    setLoading(true);
    setError(null);

    try {
      const provider = new ApiNetworkProvider(networkConfig.apiUrl);
      const accountData = await provider.getAccount({ address: targetAddress });
      setAccount(accountData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch account');
    } finally {
      setLoading(false);
    }
  }, [targetAddress]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  return { account, loading, error, refetch: fetchAccount };
}

// Network Stats Hook
export function useNetworkStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const provider = new ApiNetworkProvider(networkConfig.apiUrl);
      const networkStats = await provider.getNetworkStatus();
      setStats(networkStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch network stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}

// Transaction History Hook
export function useTransactionHistory(address?: string, limit: number = 10) {
  const { address: walletAddress } = useWallet();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const targetAddress = address || walletAddress;

  const fetchTransactions = useCallback(async () => {
    if (!targetAddress) return;

    setLoading(true);
    setError(null);

    try {
      const provider = new ApiNetworkProvider(networkConfig.apiUrl);
      const txHistory = await provider.getAccountTransactions({ 
        address: targetAddress,
        size: limit 
      });
      setTransactions(txHistory);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }, [targetAddress, limit]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, error, refetch: fetchTransactions };
}

// Smart Contract Query Hook
export function useSmartContractQuery(
  contractAddress: string,
  functionName: string,
  args: any[] = []
) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryContract = useCallback(async () => {
    if (!contractAddress || !functionName) return;

    setLoading(true);
    setError(null);

    try {
      const provider = new ApiNetworkProvider(networkConfig.apiUrl);
      
      // Basic query implementation
      // In production, use proper ABI encoding
      const query = {
        address: contractAddress,
        func: functionName,
        args: args.map(arg => Buffer.from(arg.toString()).toString('hex')),
      };
      
      const queryResponse = await provider.queryContract(query);
      setResult(queryResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to query contract');
    } finally {
      setLoading(false);
    }
  }, [contractAddress, functionName, args]);

  useEffect(() => {
    queryContract();
  }, [queryContract]);

  return { result, loading, error, refetch: queryContract };
}

// Token Balance Hook
export function useTokenBalance(tokenIdentifier: string, address?: string) {
  const { address: walletAddress } = useWallet();
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const targetAddress = address || walletAddress;

  const fetchBalance = useCallback(async () => {
    if (!targetAddress || !tokenIdentifier) return;

    setLoading(true);
    setError(null);

    try {
      const provider = new ApiNetworkProvider(networkConfig.apiUrl);
      
      if (tokenIdentifier === 'EGLD') {
        const account = await provider.getAccount({ address: targetAddress });
        setBalance(account.balance.toString());
      } else {
        // Fetch ESDT token balance
        const tokenBalance = await provider.getAccountToken({
          address: targetAddress,
          token: tokenIdentifier,
        });
        setBalance(tokenBalance.balance || '0');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch token balance');
    } finally {
      setLoading(false);
    }
  }, [targetAddress, tokenIdentifier]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { balance, loading, error, refetch: fetchBalance };
}

// Network Connection Hook
export function useNetworkConnection() {
  const [isOnline, setIsOnline] = useState(true);
  const [networkStatus, setNetworkStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');

  const checkConnection = useCallback(async () => {
    try {
      const provider = new ApiNetworkProvider(networkConfig.apiUrl);
      await provider.getNetworkStatus();
      setNetworkStatus('connected');
      setIsOnline(true);
    } catch (error) {
      setNetworkStatus('disconnected');
      setIsOnline(false);
    }
  }, []);

  useEffect(() => {
    checkConnection();
    
    // Check connection every 10 seconds
    const interval = setInterval(checkConnection, 10000);
    return () => clearInterval(interval);
  }, [checkConnection]);

  // Listen to online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      checkConnection();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setNetworkStatus('disconnected');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkConnection]);

  return { isOnline, networkStatus };
}