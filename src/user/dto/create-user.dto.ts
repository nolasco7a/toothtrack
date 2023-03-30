import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  image: string;

  @IsNumber()
  phone_number: number;

  @IsString()
  license_number: string;

  @IsString()
  languages: string[];

  @IsString()
  treatments: string[];
}
