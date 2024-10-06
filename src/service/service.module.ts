import { Module } from '@nestjs/common';
import MapperModule from '@mapper/mapper.module';
import { RepositoryModule } from '@repo/repository.module';
import { SecurityModule } from '@security/security.module';
import PSP1RouterService from '@service/psp1-router.service';
import PSP2RouterService from '@service/psp2-router.service';

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
