import {
  Body,
  Controller,
  Inject,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { PSP1Transaction } from '@controller/dto/dto';
import PSPRouterService from '@service/psp-router.service';

@Controller('callback/psp1')
export default class PSP1Controller {
  constructor(
    @Inject('PSP1_ROUTING_SERVICE')
    private tranasctionRoutingService: PSPRouterService<PSP1Transaction>,
  ) {}

  @Post()
  postTranasctionEvent(
    @Req() rawBodyRequest: RawBodyRequest<Request>,
    @Body() transactionDto: PSP1Transaction,
  ) {
    const rawBody = rawBodyRequest.rawBody;
    this.tranasctionRoutingService.acceptEvent(rawBody, transactionDto);
  }
}
