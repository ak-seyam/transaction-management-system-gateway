import { Body, Controller, Post, RawBodyRequest, Req } from '@nestjs/common';
import { Request } from 'express';
import TransactionRoutingService from 'src/service/transaction-routing.service';
import { PSP2Transaction } from './dto/dto';

@Controller('callback/psp2')
export default class PSP2Controller {
  constructor(private tranasctionRoutingService: TransactionRoutingService) {}

  @Post()
  postTranasctionEvent(
    @Req() rawBodyRequest: RawBodyRequest<Request>,
    @Body() transactionDto: PSP2Transaction,
  ) {
    const rawBody = rawBodyRequest.rawBody;
    this.tranasctionRoutingService.acceptPSP2Event(rawBody, transactionDto);
  }
}
