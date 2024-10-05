import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  Ack,
  TRANSACTION_SERVICE_NAME,
  TransactionEvent,
  TransactionHistoryResponse,
  TransactionServiceClient,
} from 'src/common/proto/service';

@Injectable()
export default class TransactionServiceRepository implements OnModuleInit {
  private transactionService: TransactionServiceClient;

  constructor(@Inject(TRANSACTION_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.transactionService = this.client.getService<TransactionServiceClient>(
      TRANSACTION_SERVICE_NAME,
    );
  }

  async sendTransactionEvent(event: TransactionEvent): Promise<Ack> {
    return new Promise((resolve, reject) => {
      this.transactionService.sendTransactionEvent(event).subscribe({
        next: (ack) => resolve(ack),
        error: (error) => reject(error),
      });
    });
  }

  async getTransactionHistory(
    userId: string,
  ): Promise<TransactionHistoryResponse> {
    return new Promise((resolve, reject) => {
      this.transactionService.getTransactionHistory({ userId }).subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error),
      });
    });
  }
}
