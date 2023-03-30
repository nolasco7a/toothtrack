import { CreateAppointmentDto } from './create-appointment.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  //definir los parametros anteriores
  @ApiProperty()
  @IsNotEmpty()
  updated_by: string;

  @ApiProperty()
  @IsNotEmpty()
  updated_at: Date;
}
