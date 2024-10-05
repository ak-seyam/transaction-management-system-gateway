import {
  MessaageType as TransactionServiceMessageType,
  Provider,
  TransactionEvent,
} from 'src/common/proto/service';
import {
  getAmountInBaseCurerncy,
  getCurrencyFromCountry,
  getFractionalDigitsByCurrency,
} from 'src/common/utils';
import {
  PSP1MessageType,
  PSP1Transaction,
  PSP2MessageType,
  PSP2Transaction,
} from 'src/controller/dto/dto';
import TransactionServiceRepository from 'src/repository/transaction-service.repository';
import { SecurityService } from 'src/security/security.service';

export default class TransactionRoutingService {
  constructor(
    private repo: TransactionServiceRepository,
    private securityService: SecurityService,
  ) {}

  async acceptPSP1Event(
    rawBody: Buffer,
    psp1TransactionEvent: PSP1Transaction,
  ) {
    await this.securityService.validatePSP1Request(rawBody);
    await this.repo.sendTransactionEvent(
      this.mapPSP1Event(psp1TransactionEvent),
    );
  }

  mapPSP1Event(psp1TransactionEvent: PSP1Transaction): TransactionEvent {
    return {
      amount: getAmountInBaseCurerncy(
        psp1TransactionEvent.billing_currency,
        psp1TransactionEvent.transaction_amount,
      ),
      cardToken: psp1TransactionEvent.card_id,
      currency: psp1TransactionEvent.billing_currency,
      eventId: psp1TransactionEvent.id,
      feesAmount: getAmountInBaseCurerncy(
        psp1TransactionEvent.billing_currency,
        psp1TransactionEvent.fee_amount,
      ),
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

  mapPSP1Type(message_type: PSP1MessageType): TransactionServiceMessageType {
    switch (message_type) {
      case PSP1MessageType.AUTHORIZATION:
        return TransactionServiceMessageType.AUTHORIZATION;
      case PSP1MessageType.CLEARING:
        return TransactionServiceMessageType.CLEARING;
      default:
        throw new Error('Unsupported message type'); // TODO use domain specific error
    }
  }

  async acceptPSP2Event(rawBody: Buffer, transactionDto: PSP2Transaction) {
    await this.securityService.validatePSP1Request(rawBody);
    await this.repo.sendTransactionEvent(this.mapPSP2Event(transactionDto));
  }

  mapPSP2Event(psp2TransactionEvent: PSP2Transaction): TransactionEvent {
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
  mapPSP2Type(type: PSP2MessageType): TransactionServiceMessageType {
    switch (type) {
      case PSP2MessageType.ACCOUNT_TRANSACTION_CREATED:
        return TransactionServiceMessageType.AUTHORIZATION;
      case PSP2MessageType.ACCOUNT_TRANSACTION_POSTED:
        return TransactionServiceMessageType.CLEARING;
    }
  }
}
