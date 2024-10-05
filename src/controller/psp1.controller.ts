import { Body, Controller, Post, RawBodyRequest, Req } from '@nestjs/common';
import { Request } from 'express';
import TransactionRoutingService from 'src/service/transaction-routing.service';
import { PSP1Transaction } from './dto/dto';

@Controller('callback/psp1')
export default class PSP1Controller {
  constructor(private tranasctionRoutingService: TransactionRoutingService) {}

  @Post()
  postTranasctionEvent(
    @Req() rawBodyRequest: RawBodyRequest<Request>,
    @Body() transactionDto: PSP1Transaction,
  ) {
    const rawBody = rawBodyRequest.rawBody;
    this.tranasctionRoutingService.acceptPSP1Event(rawBody, transactionDto);
  }
}
