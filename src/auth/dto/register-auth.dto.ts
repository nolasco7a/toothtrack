//import { PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { status_user } from 'src/types/enums';

//extendemos de login auth dto, estosignifica que aqui implicitamente tambien haremos uso de las validaciones ya creadas para email y password
export class RegisterAuthDto extends LoginAuthDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  status: status_user;
}
