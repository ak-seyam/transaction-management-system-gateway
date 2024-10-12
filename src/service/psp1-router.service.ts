import { HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import { PSP1Transaction } from '@controller/dto/dto';
import PSPToTransactionEventMapper from '@mapper/psp-to-transaction-events.mapper';
import TransactionServiceRepository from '@repo/transaction-service.repository';
import { SecurityService } from '@security/security.service';
import PSPRouterService from '@service/psp-router.service';

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
    try {
      await this.repo.sendTransactionEvent(this.pspTrxEventMapper.map(event));
    } catch (e) {
      Logger.error(`got an error ${e} while calling transaction service`, e);
    }
  }
}
