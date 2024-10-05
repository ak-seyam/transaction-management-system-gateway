import { Module } from '@nestjs/common';
import ServicesModule from 'src/service/service.module';

@Module({
  imports: [ServicesModule],
})
export default class ControllerModule {}
