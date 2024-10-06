import {
  MessaageType,
  Provider,
  TransactionEvent,
} from '@common/proto/service';
import { PSP2MessageType, PSP2Transaction } from '@controller/dto/dto';
import PSP2Mapper from '@mapper/psp2-mapper';

describe('PSP2MapperTests', () => {
  let mapper: PSP2Mapper;

  beforeEach(() => {
    mapper = new PSP2Mapper();
  });

  describe('maap psp2 events', () => {
    it('should map psp2 authorization events successfully', () => {
      const eventTime = new Date();
      const expectedMapping: TransactionEvent = {
        amount: 100_000,
        currency: 'AED',
        fractionalDigits: 2,
        cardToken: 'card123xYz',
        eventId: 'event_2345',
        feesAmount: 0,
        feesCurrency: 'AED',
        feesFractionalDigits: 2,
        provider: Provider.PSP2,
        providerEventTime: eventTime,
        reference: 'ref1244',
        type: MessaageType.AUTHORIZATION,
      };
      const input: PSP2Transaction = {
        id: 'event_2345',
        reference: 'ref1244',
        type: PSP2MessageType.ACCOUNT_TRANSACTION_CREATED,
        transaction: {
          account_id: 'card123xYz',
          amount: '1000',
          details: {
            scheme_acceptor_country: 'ARE',
            scheme_transmission_time: eventTime,
          },
        },
      };
      const result = mapper.map(input);
      expect(result).toEqual(expectedMapping);
    });

    it('should map psp2 clearing events successfully', () => {
      const eventTime = new Date();
      const expectedMapping: TransactionEvent = {
        amount: 100_000,
        currency: 'AED',
        fractionalDigits: 2,
        cardToken: 'card123xYz',
        eventId: 'event_2345',
        feesAmount: 0,
        feesCurrency: 'AED',
        feesFractionalDigits: 2,
        provider: Provider.PSP2,
        providerEventTime: eventTime,
        reference: 'ref1244',
        type: MessaageType.CLEARING,
      };
      const input: PSP2Transaction = {
        id: 'event_2345',
        reference: 'ref1244',
        type: PSP2MessageType.ACCOUNT_TRANSACTION_POSTED,
        transaction: {
          account_id: 'card123xYz',
          amount: '1000',
          details: {
            scheme_acceptor_country: 'ARE',
            scheme_transmission_time: eventTime,
          },
        },
      };
      const result = mapper.map(input);
      expect(result).toEqual(expectedMapping);
    });
  });
});
