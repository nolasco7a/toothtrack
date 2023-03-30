import { Module } from '@nestjs/common';
import { OfficeService } from './office.service';
import { OfficeController } from './office.controller';

@Module({
  controllers: [OfficeController],
  providers: [OfficeService]
})
export class OfficeModule {}
