import {
  Transaction,
  TransactionPayload,
  Address,
  Account,
  NetworkConfig,
  GasEstimator,
  TokenTransfer,
  TransactionWatcher,
  SmartContract,
  ApiNetworkProvider,
} from '@multiversx/sdk-core';
import { UserSigner } from '@multiversx/sdk-wallet';

// Define types that might be missing
export interface IBalance {
  toString(): string;
  toCurrencyString(): string;
}

export interface IGasLimit {
  valueOf(): number;
}

export interface IGasPrice {
  valueOf(): number;
}

export interface IChainID {
  valueOf(): string;
}

export interface ITransactionOnNetwork {
  hash: string;
  status: string;
  sender: string;
  receiver: string;
  value: string;
  gasLimit: number;
  gasPrice: number;
  gasUsed: number;
  nonce: number;
  round: number;
  blockNonce: number;
  blockHash: string;
  timestamp: number;
  smartContractResults?: any[];
  logs?: any[];
  receipt?: any;
  isCompleted: boolean;
  isSuccessful: boolean;
  isFailed: boolean;
  isPending: boolean;
}

export class TransactionManager {
  private networkProvider: ApiNetworkProvider;
  private watcher: TransactionWatcher;

  constructor(networkProvider: ApiNetworkProvider) {
    this.networkProvider = networkProvider;
    this.watcher = new TransactionWatcher(networkProvider);
  }

  async createTransaction(
    sender: Address,
    receiver: Address,
    value: TokenTransfer,
    gasLimit: number,
    data?: TransactionPayload
  ): Promise<Transaction> {
    const networkConfig = await this.networkProvider.getNetworkConfig();
    const account = await this.networkProvider.getAccount(sender);

    const transaction = new Transaction({
      sender,
      receiver,
      value,
      gasLimit,
      data,
      chainID: networkConfig.ChainID,
      gasPrice: networkConfig.MinGasPrice,
      nonce: account.nonce,
    });

    return transaction;
  }

  async sendTransaction(transaction: Transaction, signer: UserSigner): Promise<string> {
    await signer.sign(transaction);
    return await this.networkProvider.sendTransaction(transaction);
  }

  async waitForTransaction(txHash: string): Promise<ITransactionOnNetwork> {
    const transactionOnNetwork = await this.watcher.awaitCompleted({
      getHash: () => ({ hex: () => txHash })
    } as any);

    return {
      hash: txHash,
      status: transactionOnNetwork.status.toString(),
      sender: transactionOnNetwork.sender.toString(),
      receiver: transactionOnNetwork.receiver.toString(),
      value: transactionOnNetwork.value.toString(),
      gasLimit: transactionOnNetwork.gasLimit.valueOf(),
      gasPrice: transactionOnNetwork.gasPrice.valueOf(),
      gasUsed: transactionOnNetwork.gasUsed?.valueOf() || 0,
      nonce: transactionOnNetwork.nonce.valueOf(),
      round: transactionOnNetwork.round || 0,
      blockNonce: transactionOnNetwork.blockNonce?.valueOf() || 0,
      blockHash: transactionOnNetwork.blockHash || '',
      timestamp: transactionOnNetwork.timestamp?.valueOf() || 0,
      smartContractResults: transactionOnNetwork.contractResults?.getImmediate() || [],
      logs: transactionOnNetwork.logs?.events || [],
      receipt: transactionOnNetwork.receipt,
      isCompleted: transactionOnNetwork.status.isExecuted(),
      isSuccessful: transactionOnNetwork.status.isSuccessful(),
      isFailed: transactionOnNetwork.status.isFailed(),
      isPending: !transactionOnNetwork.status.isExecuted(),
    };
  }

  async getTransactionStatus(txHash: string): Promise<{
    isPending: boolean;
    isSuccessful: boolean;
    isFailed: boolean;
  }> {
    try {
      const transaction = await this.networkProvider.getTransaction(txHash);
      return {
        isPending: !transaction.status.isExecuted(),
        isSuccessful: transaction.status.isSuccessful(),
        isFailed: transaction.status.isFailed(),
      };
    } catch (error) {
      return {
        isPending: true,
        isSuccessful: false,
        isFailed: false,
      };
    }
  }
}

// Balance utility class
export class Balance implements IBalance {
  private value: string;
  private decimals: number;

  constructor(value: string, decimals: number = 18) {
    this.value = value;
    this.decimals = decimals;
  }

  toString(): string {
    return this.value;
  }

  toCurrencyString(): string {
    const numValue = parseFloat(this.value) / Math.pow(10, this.decimals);
    return numValue.toFixed(4);
  }
}

// Gas utilities
export class GasLimit implements IGasLimit {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  valueOf(): number {
    return this.value;
  }
}

export class GasPrice implements IGasPrice {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  valueOf(): number {
    return this.value;
  }
}

export class ChainID implements IChainID {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  valueOf(): string {
    return this.value;
  }
}
