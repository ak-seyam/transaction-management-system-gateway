import { PSP1MessageType, PSP1Transaction } from '@controller/dto/dto';
import PSPToTransactionEventMapper from '@mapper/psp-to-transaction-events.mapper';
import {
  MessaageType,
  Provider,
  TransactionEvent,
} from '@common/proto/service';
import {
  getAmountInBaseCurerncy,
  getFractionalDigitsByCurrency,
} from '@common/utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class PSP1Mapper
  implements PSPToTransactionEventMapper<PSP1Transaction>
{
  map(psp1TransactionEvent: PSP1Transaction): TransactionEvent {
    return {
      amount: getAmountInBaseCurerncy(
        psp1TransactionEvent.billing_currency,
        psp1TransactionEvent.transaction_amount,
      ).toString(),
      cardToken: psp1TransactionEvent.card_id,
      currency: psp1TransactionEvent.billing_currency,
      eventId: psp1TransactionEvent.id,
      feesAmount: getAmountInBaseCurerncy(
        psp1TransactionEvent.billing_currency,
        psp1TransactionEvent.fee_amount,
      ).toString(),
      feesCurrency: psp1TransactionEvent.billing_currency, // assuming  same currency for simplicity
      feesFractionalDigits: getFractionalDigitsByCurrency(
        psp1TransactionEvent.billing_currency,
      ),
      fractionalDigits: getFractionalDigitsByCurrency(
        psp1TransactionEvent.billing_currency,
      ),
      provider: Provider.PSP1,
      providerEventTime: psp1TransactionEvent.transaction_timestamp,
      reference: psp1TransactionEvent.rrn,
      type: this.mapPSP1Type(psp1TransactionEvent.message_type),
    };
  }

  private mapPSP1Type(message_type: PSP1MessageType): MessaageType {
    switch (message_type) {
      case PSP1MessageType.AUTHORIZATION:
        return MessaageType.AUTHORIZATION;
      case PSP1MessageType.CLEARING:
        return MessaageType.CLEARING;
      default:
        throw new Error('Unsupported message type'); // TODO use domain specific error
    }
  }
}
