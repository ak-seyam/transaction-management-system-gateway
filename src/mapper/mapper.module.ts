import { Module } from '@nestjs/common';
import PSP1Mapper from './psp1-mapper';
import PSP2Mapper from './psp2-mapper';

@Module({
  providers: [
    {
      provide: 'PSP1_MAPPER',
      useClass: PSP1Mapper,
    },
    {
      provide: 'PSP2_MAPPER',
      useClass: PSP2Mapper,
    },
  ],
  exports: ['PSP1_MAPPER', 'PSP2_MAPPER'],
})
export default class MapperModule {}
