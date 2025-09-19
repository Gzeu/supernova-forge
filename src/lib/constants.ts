// MultiversX Network Configuration
export const NETWORK_CONFIG = {
  DEVNET: {
    id: 'devnet',
    name: 'Devnet',
    chainId: 'D',
    apiUrl: 'https://devnet-api.multiversx.com',
    gatewayUrl: 'https://devnet-gateway.multiversx.com',
    explorerUrl: 'https://devnet-explorer.multiversx.com',
    walletUrl: 'https://devnet-wallet.multiversx.com',
  },
  TESTNET: {
    id: 'testnet',
    name: 'Testnet', 
    chainId: 'T',
    apiUrl: 'https://testnet-api.multiversx.com',
    gatewayUrl: 'https://testnet-gateway.multiversx.com',
    explorerUrl: 'https://testnet-explorer.multiversx.com',
    walletUrl: 'https://testnet-wallet.multiversx.com',
  },
  MAINNET: {
    id: 'mainnet',
    name: 'Mainnet',
    chainId: '1',
    apiUrl: 'https://api.multiversx.com',
    gatewayUrl: 'https://gateway.multiversx.com',
    explorerUrl: 'https://explorer.multiversx.com',
    walletUrl: 'https://wallet.multiversx.com',
  },
} as const;

// Get current network from environment
export const CURRENT_NETWORK = NETWORK_CONFIG[
  (process.env.NEXT_PUBLIC_MULTIVERSX_NETWORK?.toUpperCase() as keyof typeof NETWORK_CONFIG) || 'DEVNET'
];

// Wallet Connect Configuration
export const WALLET_CONNECT_CONFIG = {
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  metadata: {
    name: 'SupernovaForge',
    description: 'MultiversX dApp Development Platform',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    icons: ['https://supernova-forge.vercel.app/favicon.ico'],
  },
};

// Application Constants
export const APP_CONFIG = {
  name: 'SupernovaForge',
  version: '0.1.0',
  description: 'Advanced MultiversX dApp Development Platform',
  author: 'George Pricop',
  github: 'https://github.com/Gzeu/supernova-forge',
  linear: 'https://linear.app/gpz/project/fed0da9f-406b-4258-aa0b-4057c31f3be1',
  notion: 'https://www.notion.so/273c2a544835812485f5cc38b6790c3a',
};

// Smart Contract Templates
export const CONTRACT_TEMPLATES = {
  DEFI: {
    AMM: {
      name: 'AMM DEX Protocol',
      description: 'Automated Market Maker with liquidity pools',
      category: 'DeFi',
      difficulty: 'Advanced',
    },
    STAKING: {
      name: 'Staking Protocol',
      description: 'Token staking with customizable rewards',
      category: 'DeFi', 
      difficulty: 'Intermediate',
    },
    LENDING: {
      name: 'Lending Platform',
      description: 'Decentralized borrowing and lending',
      category: 'DeFi',
      difficulty: 'Advanced',
    },
  },
  NFT: {
    COLLECTION: {
      name: 'NFT Collection',
      description: 'Standard NFT collection contract',
      category: 'NFT',
      difficulty: 'Beginner',
    },
    MARKETPLACE: {
      name: 'NFT Marketplace',
      description: 'Full-featured NFT trading platform',
      category: 'NFT',
      difficulty: 'Advanced',
    },
  },
  DAO: {
    GOVERNANCE: {
      name: 'Governance Token',
      description: 'Voting and proposal mechanisms',
      category: 'DAO',
      difficulty: 'Advanced',
    },
  },
} as const;