import {
  Transaction,
  TransactionPayload,
  Address,
  Balance,
  GasLimit,
  GasPrice,
  TransactionVersion,
  ChainID,
} from '@multiversx/sdk-core';
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers';
import {
  networkConfig,
  SUPERNOVA_TX_VERSION,
  GAS_CONFIG,
  TX_STATUS,
  TransactionStatus,
} from './config';
import { IWalletProvider } from './providers';

// Transaction Builder with Supernova Updates
export class SupernovaTransactionBuilder {
  private provider: ApiNetworkProvider;

  constructor() {
    this.provider = new ApiNetworkProvider(networkConfig.apiUrl);
  }

  // Create basic transaction
  async createTransaction({
    sender,
    receiver,
    value = '0',
    data = '',
    gasLimit,
    gasPrice = GAS_CONFIG.gasPrice,
  }: {
    sender: string;
    receiver: string;
    value?: string;
    data?: string;
    gasLimit?: number;
    gasPrice?: number;
  }): Promise<Transaction> {
    const senderAddress = new Address(sender);
    const account = await this.provider.getAccount(senderAddress);

    // Calculate gas limit if not provided
    const calculatedGasLimit = gasLimit || this.calculateGasLimit(data, value);

    const transaction = new Transaction({
      sender: senderAddress,
      receiver: new Address(receiver),
      value: Balance.egld(value),
      data: new TransactionPayload(data),
      gasLimit: new GasLimit(calculatedGasLimit),
      gasPrice: new GasPrice(gasPrice),
      chainID: new ChainID(networkConfig.chainId),
      version: new TransactionVersion(SUPERNOVA_TX_VERSION),
      nonce: account.nonce,
    });

    return transaction;
  }

  // Create smart contract call transaction
  async createSmartContractCall({
    sender,
    contractAddress,
    functionName,
    args = [],
    value = '0',
    gasLimit = GAS_CONFIG.gasLimit.scCall,
  }: {
    sender: string;
    contractAddress: string;
    functionName: string;
    args?: any[];
    value?: string;
    gasLimit?: number;
  }): Promise<Transaction> {
    // Encode function call data
    const data = this.encodeFunctionCall(functionName, args);

    return this.createTransaction({
      sender,
      receiver: contractAddress,
      value,
      data,
      gasLimit,
    });
  }

  // Create smart contract deploy transaction
  async createSmartContractDeploy({
    sender,
    code,
    args = [],
    value = '0',
    gasLimit = GAS_CONFIG.gasLimit.scDeploy,
  }: {
    sender: string;
    code: string;
    args?: any[];
    value?: string;
    gasLimit?: number;
  }): Promise<Transaction> {
    // Encode deployment data
    const data = this.encodeDeployData(code, args);

    return this.createTransaction({
      sender,
      receiver: Address.Zero().bech32(),
      value,
      data,
      gasLimit,
    });
  }

  // Calculate gas limit based on transaction data
  private calculateGasLimit(data: string, value: string): number {
    let gasLimit = GAS_CONFIG.gasLimit.min;

    // Add gas for data
    if (data) {
      const dataLength = Buffer.from(data).length;
      gasLimit += dataLength * GAS_CONFIG.gasPerDataByte;
    }

    // Add gas for value transfer
    if (value !== '0') {
      gasLimit += 50000;
    }

    return Math.min(gasLimit, GAS_CONFIG.gasLimit.max);
  }

  // Encode smart contract function call
  private encodeFunctionCall(functionName: string, args: any[]): string {
    // Basic encoding - in production use proper ABI encoding
    const encoded = [functionName, ...args].join('@');
    return encoded;
  }

  // Encode smart contract deployment data
  private encodeDeployData(code: string, args: any[]): string {
    // Basic encoding - in production use proper deployment encoding
    const argsEncoded = args.length > 0 ? '@' + args.join('@') : '';
    return code + argsEncoded;
  }
}

// Transaction Service
export class SupernovaTransactionService {
  private provider: ApiNetworkProvider;
  private builder: SupernovaTransactionBuilder;

  constructor() {
    this.provider = new ApiNetworkProvider(networkConfig.apiUrl);
    this.builder = new SupernovaTransactionBuilder();
  }

  // Send transaction
  async sendTransaction(
    transaction: Transaction,
    walletProvider: IWalletProvider
  ): Promise<string> {
    try {
      // Sign transaction
      const signedTransactions = await walletProvider.signTransactions([transaction]);
      const signedTransaction = signedTransactions[0];

      // Send to network
      const txHash = await this.provider.sendTransaction(signedTransaction);
      return txHash;
    } catch (error) {
      console.error('Transaction send failed:', error);
      throw error;
    }
  }

  // Get transaction status
  async getTransactionStatus(txHash: string): Promise<TransactionStatus> {
    try {
      const transaction = await this.provider.getTransaction(txHash);
      
      if (transaction.isPending) return TX_STATUS.PENDING;
      if (transaction.isSuccessful) return TX_STATUS.SUCCESS;
      if (transaction.isFailed) return TX_STATUS.FAIL;
      
      return TX_STATUS.INVALID;
    } catch (error) {
      console.error('Failed to get transaction status:', error);
      return TX_STATUS.INVALID;
    }
  }

  // Wait for transaction completion
  async waitForTransactionCompletion(
    txHash: string,
    timeout: number = 60000
  ): Promise<TransactionStatus> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const status = await this.getTransactionStatus(txHash);
      
      if (status !== TX_STATUS.PENDING) {
        return status;
      }
      
      // Wait 2 seconds before next check
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    throw new Error('Transaction timeout');
  }

  // Get transaction details
  async getTransactionDetails(txHash: string) {
    try {
      return await this.provider.getTransaction(txHash);
    } catch (error) {
      console.error('Failed to get transaction details:', error);
      throw error;
    }
  }

  // Estimate transaction fee
  async estimateTransactionFee(transaction: Transaction): Promise<string> {
    const gasLimit = transaction.getGasLimit().valueOf();
    const gasPrice = transaction.getGasPrice().valueOf();
    const fee = gasLimit * gasPrice;
    
    return Balance.fromString(fee.toString()).toPrettyString();
  }
}