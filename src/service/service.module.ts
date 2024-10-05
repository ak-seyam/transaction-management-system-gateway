import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { SecurityModule } from 'src/security/security.module';

@Module({ imports: [RepositoryModule, SecurityModule] })
export default class ServicesModule {}
