import { IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from '../entities/address.entity';
export class CreateOfficeDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsObject()
  address: Address;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  created_by: string;
}
