import { Module } from '@nestjs/common';
import MapperModule from 'src/mapper/mapper.module';
import { RepositoryModule } from 'src/repository/repository.module';
import { SecurityModule } from 'src/security/security.module';
import PSP1RouterService from './psp1-router.service';
import PSP2RouterService from './psp2-router.service';

@Module({
  imports: [RepositoryModule, SecurityModule, MapperModule],
  providers: [
    {
      provide: 'PSP1_ROUTING_SERVICE',
      useClass: PSP1RouterService,
    },
    {
      provide: 'PSP2_ROUTING_SERVICE',
      useClass: PSP2RouterService,
    },
  ],
  exports: ['PSP1_ROUTING_SERVICE', 'PSP2_ROUTING_SERVICE'],
})
export default class ServicesModule {}
