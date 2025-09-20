import { SmartContract, Address, AbiRegistry } from '@multiversx/sdk-core';
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers';

// Define SmartContractAbi interface for backwards compatibility
export interface SmartContractAbi {
  name: string;
  constructor: any;
  endpoints: any[];
  events: any[];
  types: any[];
}

export interface ContractTemplate {
  name: string;
  description: string;
  abi: SmartContractAbi;
  code: string;
  category: 'defi' | 'nft' | 'dao' | 'gaming' | 'utility';
}

export class SmartContractGenerator {
  private networkProvider: ApiNetworkProvider;

  constructor(networkProvider: ApiNetworkProvider) {
    this.networkProvider = networkProvider;
  }

  async generateContract(template: ContractTemplate): Promise<SmartContract> {
    const address = new Address('erd1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq6gq4c5');
    const abi = AbiRegistry.create(template.abi as any);
    
    const contract = new SmartContract({
      address,
      abi,
    });

    return contract;
  }

  getAvailableTemplates(): ContractTemplate[] {
    return [
      {
        name: 'ERC20 Token',
        description: 'Standard fungible token contract',
        category: 'defi',
        abi: {
          name: 'ERC20Token',
          constructor: {},
          endpoints: [],
          events: [],
          types: [],
        },
        code: '',
      },
      {
        name: 'NFT Collection',
        description: 'Non-fungible token collection contract',
        category: 'nft',
        abi: {
          name: 'NFTCollection',
          constructor: {},
          endpoints: [],
          events: [],
          types: [],
        },
        code: '',
      },
    ];
  }

  async validateContract(address: Address): Promise<boolean> {
    try {
      const account = await this.networkProvider.getAccount(address);
      return account.code?.length > 0;
    } catch (error) {
      return false;
    }
  }
}
