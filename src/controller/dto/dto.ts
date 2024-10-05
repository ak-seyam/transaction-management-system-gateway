export interface PSP1Transaction {
  id: string;
  rrn: string;
  card_id: string;
  fee_amount: number;
  billing_currency: string;
  message_type: PSP1MessageType;
  transaction_amount: number;
  transaction_timestamp: Date;
}

export enum PSP1MessageType {
  AUTHORIZATION,
  CLEARING,
}

export interface PSP2Transaction {
  id: string;
  type: PSP2MessageType;
  reference: string;
  transaction: PSP2TransactionData;
}

export enum PSP2MessageType {
  ACCOUNT_TRANSACTION_CREATED,
  ACCOUNT_TRANSACTION_POSTED,
}

interface PSP2TransactionData {
  amount: string; // NOTE: in PSP's contract it is a string will need to parse it before passing to transaction service
  account_id: string; // Assume that account id is the card token in this case
  details: PSP2TransactionDetails;
}

interface PSP2TransactionDetails {
  scheme_transmission_time: Date;
  scheme_acceptor_country: string;
}
