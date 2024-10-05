import { Module } from '@nestjs/common';
import TransactionServiceRepository from './transaction-service.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  protobufPackage as transactionServiceProtobufPackage,
  TRANSACTION_SERVICE_NAME,
} from 'src/common/proto/service';
import { join } from 'path';

@Module({
  providers: [TransactionServiceRepository],
  imports: [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: TRANSACTION_SERVICE_NAME,
        options: {
          package: transactionServiceProtobufPackage,
          protoPath: join(__dirname, '../../proto/service.proto'),
        },
      },
    ]),
  ],
})
export class RepositoryModule {}
