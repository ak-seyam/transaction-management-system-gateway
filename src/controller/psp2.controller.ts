import {
  Body,
  Controller,
  Inject,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { PSP2Transaction } from './dto/dto';
import PSPRouterService from 'src/service/psp-router.service';

@Controller('callback/psp2')
export default class PSP2Controller {
  constructor(
    @Inject('PSP2_ROUTING_SERVICE')
    private tranasctionRoutingService: PSPRouterService<PSP2Transaction>,
  ) {}

  @Post()
  postTranasctionEvent(
    @Req() rawBodyRequest: RawBodyRequest<Request>,
    @Body() transactionDto: PSP2Transaction,
  ) {
    const rawBody = rawBodyRequest.rawBody;
    this.tranasctionRoutingService.acceptEvent(rawBody, transactionDto);
  }
}
