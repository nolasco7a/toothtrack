import { PartialType } from '@nestjs/mapped-types';
import { CreateOfficeDto } from './create-office.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject } from 'class-validator';
import { Address } from '../entities/address.entity';
export class UpdateOfficeDto extends PartialType(CreateOfficeDto) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsObject()
  address: Address;

  @ApiProperty()
  @IsString()
  updated_at: Date;

  @ApiProperty()
  @IsString()
  updated_by: string;
}
