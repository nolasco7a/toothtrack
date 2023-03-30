//import { PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty, IsString } from 'class-validator';

//extendemos de login auth dto, estosignifica que aqui implicitamente tambien haremos uso de las validaciones ya creadas para email y password
export class RegisterAuthDto extends LoginAuthDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
