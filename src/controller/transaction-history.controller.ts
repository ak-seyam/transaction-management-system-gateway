import { Controller, Get, Param } from '@nestjs/common';
import TransactionHistoryService from '@service/transaction-history.service';

@Controller('/transactions')
export default class TransactionHistoryController {
  constructor(private transactionHistoryService: TransactionHistoryService) {}

  @Get(':userId')
  async getTransactionHistoryForUser(@Param('userId') userId: string) {
    return await this.transactionHistoryService.getTransactionHistoryByUserId(
      userId,
    );
  }
}
