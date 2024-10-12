import PSP1Mapper from '@mapper/psp1-mapper';
import {
  MessaageType,
  Provider,
  TransactionEvent,
} from '@common/proto/service';
import { PSP1MessageType, PSP1Transaction } from '@controller/dto/dto';

describe('PSP1MapperTests', () => {
  let mapper: PSP1Mapper;

  beforeEach(() => {
    mapper = new PSP1Mapper();
  });

  describe('maap psp1 events', () => {
    it('should map psp1 authorization events successfully', () => {
      const eventTime = new Date();
      const expectedMapping: TransactionEvent = {
        amount: '100000',
        currency: 'AED',
        fractionalDigits: 2,
        cardToken: 'card123xYz',
        eventId: 'event_2345',
        feesAmount: '0',
        feesCurrency: 'AED',
        feesFractionalDigits: 2,
        provider: Provider.PSP1,
        providerEventTime: eventTime,
        reference: 'ref1244',
        type: MessaageType.AUTHORIZATION,
      };
      const input: PSP1Transaction = {
        billing_currency: 'AED',
        card_id: 'card123xYz',
        fee_amount: 0,
        id: 'event_2345',
        message_type: PSP1MessageType.AUTHORIZATION,
        rrn: 'ref1244',
        transaction_amount: 1000,
        transaction_timestamp: eventTime,
      };
      const result = mapper.map(input);
      expect(result).toEqual(expectedMapping);
    });

    it('should map psp1 clearing events successfully', () => {
      const eventTime = new Date();
      const expectedMapping: TransactionEvent = {
        amount: '100000',
        currency: 'AED',
        fractionalDigits: 2,
        cardToken: 'card123xYz',
        eventId: 'event_2345',
        feesAmount: '0',
        feesCurrency: 'AED',
        feesFractionalDigits: 2,
        provider: Provider.PSP1,
        providerEventTime: eventTime,
        reference: 'ref1244',
        type: MessaageType.CLEARING,
      };
      const input: PSP1Transaction = {
        billing_currency: 'AED',
        card_id: 'card123xYz',
        fee_amount: 0,
        id: 'event_2345',
        message_type: PSP1MessageType.CLEARING,
        rrn: 'ref1244',
        transaction_amount: 1000,
        transaction_timestamp: eventTime,
      };
      const result = mapper.map(input);
      expect(result).toEqual(expectedMapping);
    });
  });
});
