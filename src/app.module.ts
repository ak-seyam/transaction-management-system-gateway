import { Module } from '@nestjs/common';
import { RepositoryModule } from './repository/repository.module';
import { SecurityModule } from './security/security.module';
import ServicesModule from './service/service.module';
import ControllerModule from './controller/controller.module';

@Module({
  imports: [RepositoryModule, ServicesModule, ControllerModule, SecurityModule],
})
export class AppModule {}
