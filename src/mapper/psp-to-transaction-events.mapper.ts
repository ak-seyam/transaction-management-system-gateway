import { TransactionEvent } from 'src/common/proto/service';

export default interface PSPToTransactionEventMapper<T> {
  map(event: T): TransactionEvent;
}
