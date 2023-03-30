import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { status_appointment } from 'src/types/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentByWebsiteDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  phone_number: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(status_appointment)
  status: status_appointment;

  @ApiProperty()
  @IsNotEmpty()
  created_at: Date;

  @ApiProperty()
  email: string;
  @ApiProperty()
  consulting_reason: string;
  @ApiProperty()
  patient: string;
}
