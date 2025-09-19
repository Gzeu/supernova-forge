'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWallet } from '@/contexts/WalletContext';
import { WALLET_PROVIDERS } from '@/lib/multiversx/config';
import { Wallet, ChevronDown, LogOut, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const PROVIDER_NAMES = {
  [WALLET_PROVIDERS.EXTENSION]: 'xPortal Extension',
  [WALLET_PROVIDERS.WALLET_CONNECT]: 'WalletConnect',
  [WALLET_PROVIDERS.WEB_WALLET]: 'Web Wallet',
  [WALLET_PROVIDERS.LEDGER]: 'Ledger',
} as const;

export function WalletButton() {
  const {
    isConnected,
    isConnecting,
    address,
    balance,
    provider,
    supportedProviders,
    connectWallet,
    disconnectWallet,
    error,
    clearError,
  } = useWallet();

  const [showProviders, setShowProviders] = useState(false);

  const handleConnect = async (providerType: string) => {
    try {
      clearError();
      await connectWallet(providerType as any);
      setShowProviders(false);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      toast.error('Failed to connect wallet');
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      toast.success('Wallet disconnected');
    } catch (error) {
      toast.error('Failed to disconnect wallet');
    }
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard');
    }
  };

  const openExplorer = () => {
    if (address) {
      const explorerUrl = `https://devnet-explorer.multiversx.com/accounts/${address}`;
      window.open(explorerUrl, '_blank');
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-2">
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">{formatAddress(address)}</span>
            <Badge variant="success" className="ml-1">
              Connected
            </Badge>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Wallet Connected</p>
              <p className="text-xs leading-none text-muted-foreground">
                {provider && PROVIDER_NAMES[provider as keyof typeof PROVIDER_NAMES]}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <div className="px-2 py-1.5">
            <div className="text-xs text-muted-foreground mb-1">Address</div>
            <div className="text-sm font-mono">{formatAddress(address)}</div>
          </div>
          
          <div className="px-2 py-1.5">
            <div className="text-xs text-muted-foreground mb-1">Balance</div>
            <div className="text-sm font-semibold">{balance}</div>
          </div>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={copyAddress}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Address
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={openExplorer}>
            <ExternalLink className="mr-2 h-4 w-4" />
            View in Explorer
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleDisconnect} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (showProviders) {
    return (
      <div className="flex flex-col space-y-2 p-4 bg-card rounded-lg border">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Choose Wallet</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowProviders(false)}
          >
            ×
          </Button>
        </div>
        
        {supportedProviders.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No supported wallets found. Please install xPortal or another compatible wallet.
          </p>
        ) : (
          supportedProviders.map((providerType) => (
            <Button
              key={providerType}
              variant="outline"
              className="justify-start"
              onClick={() => handleConnect(providerType)}
              disabled={isConnecting}
            >
              <Wallet className="mr-2 h-4 w-4" />
              {PROVIDER_NAMES[providerType as keyof typeof PROVIDER_NAMES]}
            </Button>
          ))
        )}
        
        {error && (
          <div className="text-sm text-red-600 bg-red-50 dark:bg-red-950 p-2 rounded">
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <Button
      onClick={() => setShowProviders(true)}
      variant="multiversx"
      disabled={isConnecting}
      loading={isConnecting}
    >
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
}