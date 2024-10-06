import { Injectable } from '@nestjs/common';
import TransactionServiceRepository from '@repo/transaction-service.repository';

@Injectable()
export default class TransactionHistoryService {
  constructor(private repo: TransactionServiceRepository) {}

  getTransactionHistoryByUserId(userId: string) {
    return this.repo.getTransactionHistory(userId);
  }
}
