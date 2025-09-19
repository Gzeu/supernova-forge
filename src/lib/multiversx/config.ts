import { CURRENT_NETWORK } from '@/lib/constants';

// MultiversX Network Configuration with Supernova Updates
export const networkConfig = {
  chainId: CURRENT_NETWORK.chainId,
  name: CURRENT_NETWORK.name,
  apiUrl: CURRENT_NETWORK.apiUrl,
  gatewayUrl: CURRENT_NETWORK.gatewayUrl,
  explorerUrl: CURRENT_NETWORK.explorerUrl,
  walletUrl: CURRENT_NETWORK.walletUrl,
};

// Supernova Transaction Version
export const SUPERNOVA_TX_VERSION = 2;

// Gas Configuration
export const GAS_CONFIG = {
  gasPrice: 1000000000, // 1 GWEI
  gasPerDataByte: 1500,
  gasLimit: {
    min: 50000,
    max: 600000000,
    scCall: 60000000,
    scDeploy: 60000000,
  },
};

// Wallet Provider Configuration
export const WALLET_PROVIDERS = {
  XPORTAL: 'xportal',
  EXTENSION: 'extension',
  WEB_WALLET: 'web-wallet',
  LEDGER: 'ledger',
  WALLET_CONNECT: 'wallet-connect',
} as const;

export type WalletProvider = typeof WALLET_PROVIDERS[keyof typeof WALLET_PROVIDERS];

// Smart Contract Constants
export const SC_CONFIG = {
  deployGasLimit: 60000000,
  callGasLimit: 30000000,
  queryGasLimit: 50000000,
};

// Token Configuration
export const TOKEN_CONFIG = {
  decimals: 18,
  identifier: 'EGLD',
  ticker: 'EGLD',
};

// API Endpoints
export const API_ENDPOINTS = {
  accounts: '/accounts',
  transactions: '/transactions',
  blocks: '/blocks',
  tokens: '/tokens',
  nfts: '/collections',
  economics: '/economics',
  stats: '/stats',
};

// Transaction Status
export const TX_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAIL: 'fail',
  INVALID: 'invalid',
} as const;

export type TransactionStatus = typeof TX_STATUS[keyof typeof TX_STATUS];