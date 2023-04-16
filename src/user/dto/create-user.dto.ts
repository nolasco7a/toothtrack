import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  phone_number: number;
  image: string;
  license_number: string;
  languages: string[];
  treatments: string[];
}
