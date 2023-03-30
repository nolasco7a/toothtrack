import { CreateAppointmentByWebsiteDto } from './create-appointment-by-website.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto extends CreateAppointmentByWebsiteDto {
  @ApiProperty()
  @IsNotEmpty()
  hour: string;

  @ApiProperty()
  @IsNotEmpty()
  dentist: string;

  @ApiProperty()
  @IsNotEmpty()
  created_by: string;
}
