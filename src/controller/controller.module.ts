import { Module } from '@nestjs/common';
import ServicesModule from 'src/service/service.module';
import PSP1Controller from './psp1.controller';
import PSP2Controller from './psp2.controller';

@Module({
  imports: [ServicesModule],
  controllers: [PSP1Controller, PSP2Controller],
})
export default class ControllerModule {}
