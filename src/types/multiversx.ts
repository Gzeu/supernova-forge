// MultiversX Core Types
export interface NetworkConfig {
  id: string;
  name: string;
  chainId: string;
  apiUrl: string;
  gatewayUrl: string;
  explorerUrl: string;
  walletUrl: string;
}

export interface WalletInfo {
  address: string;
  balance?: string;
  nonce?: number;
  isConnected: boolean;
  provider?: string;
}

export interface Transaction {
  hash: string;
  sender: string;
  receiver: string;
  value: string;
  gasLimit: number;
  gasPrice: number;
  status: 'pending' | 'success' | 'fail';
  timestamp: number;
}

export interface SmartContract {
  address: string;
  name: string;
  abi: any[];
  deployedAt?: number;
  creator?: string;
}

// Template Types
export interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  category: 'DeFi' | 'NFT' | 'Gaming' | 'DAO';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sourceCode: string;
  abi: any[];
  deploymentScript: string;
  testSuite: string;
  documentation: string;
  tags: string[];
  estimatedGas: number;
  createdAt: number;
  updatedAt: number;
}

export interface ProjectConfig {
  name: string;
  description: string;
  network: 'mainnet' | 'testnet' | 'devnet';
  contracts: SmartContract[];
  templates: ContractTemplate[];
  deploymentConfig: {
    autoVerify: boolean;
    gasLimit: number;
    gasPrice: number;
  };
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Supernova Update Types
export interface SupernovaTransaction {
  version: number;
  chainID: string;
  nonce: number;
  value: string;
  receiver: string;
  sender: string;
  gasPrice: number;
  gasLimit: number;
  data?: string;
  signature: string;
  options?: number;
  guardian?: string;
  guardianSignature?: string;
}

export interface SupernovaFeatures {
  enhancedTransactions: boolean;
  optimizedGas: boolean;
  improvedSecurity: boolean;
  betterWalletIntegration: boolean;
  advancedSmartContractSupport: boolean;
}