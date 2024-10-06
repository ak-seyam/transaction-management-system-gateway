import { PSP2MessageType, PSP2Transaction } from '@controller/dto/dto';
import PSPToTransactionEventMapper from '@mapper/psp-to-transaction-events.mapper';
import {
  MessaageType,
  Provider,
  TransactionEvent,
} from '@common/proto/service';
import {
  getAmountInBaseCurerncy,
  getCurrencyFromCountry,
  getFractionalDigitsByCurrency,
} from '@common/utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class PSP2Mapper
  implements PSPToTransactionEventMapper<PSP2Transaction>
{
  map(psp2TransactionEvent: PSP2Transaction): TransactionEvent {
    const currency = getCurrencyFromCountry(
      psp2TransactionEvent.transaction.details.scheme_acceptor_country,
    );
    const amount = getAmountInBaseCurerncy(
      currency,
      parseInt(psp2TransactionEvent.transaction.amount),
    );
    const fractionalDigits = getFractionalDigitsByCurrency(currency);
    return {
      amount,
      cardToken: psp2TransactionEvent.transaction.account_id,
      currency,
      eventId: psp2TransactionEvent.id,
      feesAmount: 0,
      feesCurrency: currency,
      feesFractionalDigits: fractionalDigits,
      fractionalDigits,
      provider: Provider.PSP2,
      providerEventTime:
        psp2TransactionEvent.transaction.details.scheme_transmission_time,
      reference: psp2TransactionEvent.reference,
      type: this.mapPSP2Type(psp2TransactionEvent.type),
    };
  }
  private mapPSP2Type(type: PSP2MessageType): MessaageType {
    switch (type) {
      case PSP2MessageType.ACCOUNT_TRANSACTION_CREATED:
        return MessaageType.AUTHORIZATION;
      case PSP2MessageType.ACCOUNT_TRANSACTION_POSTED:
        return MessaageType.CLEARING;
    }
  }
}
