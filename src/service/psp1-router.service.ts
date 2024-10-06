import { Inject } from '@nestjs/common';
import { PSP1Transaction } from 'src/controller/dto/dto';
import PSPToTransactionEventMapper from 'src/mapper/psp-to-transaction-events.mapper';
import TransactionServiceRepository from 'src/repository/transaction-service.repository';
import { SecurityService } from 'src/security/security.service';
import PSPRouterService from './psp-router.service';

export default class PSP1RouterService
  implements PSPRouterService<PSP1Transaction>
{
  constructor(
    private repo: TransactionServiceRepository,
    private securityService: SecurityService,
    @Inject('PSP1_MAPPER')
    private pspTrxEventMapper: PSPToTransactionEventMapper<PSP1Transaction>,
  ) {}

  async acceptEvent(rawBody: Buffer, event: PSP1Transaction): Promise<void> {
    await this.securityService.validatePSP1Request(rawBody);
    await this.repo.sendTransactionEvent(this.pspTrxEventMapper.map(event));
  }
}
