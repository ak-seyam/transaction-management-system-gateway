import { Inject } from '@nestjs/common';
import { PSP2Transaction } from 'src/controller/dto/dto';
import PSPToTransactionEventMapper from 'src/mapper/psp-to-transaction-events.mapper';
import TransactionServiceRepository from 'src/repository/transaction-service.repository';
import { SecurityService } from 'src/security/security.service';
import PSPRouterService from './psp-router.service';

export default class PSP2RouterService
  implements PSPRouterService<PSP2Transaction>
{
  constructor(
    private repo: TransactionServiceRepository,
    private securityService: SecurityService,
    @Inject('PSP2_MAPPER')
    private pspTrxEventMapper: PSPToTransactionEventMapper<PSP2Transaction>,
  ) {}
  async acceptEvent(rawBody: Buffer, event: PSP2Transaction): Promise<void> {
    await this.securityService.validatePSP2Request(rawBody);
    await this.repo.sendTransactionEvent(this.pspTrxEventMapper.map(event));
  }
}
