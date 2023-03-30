import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
//import { ApiTags } from '@nestjs/swagger';

//@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: user exist verification
  @Post('register')
  registerUser(@Body() RegisterAuthDto: RegisterAuthDto) {
    return this.authService.register(RegisterAuthDto);
  }

  @Post('login')
  loginUser(@Body() LoginAuthDto: LoginAuthDto) {
    return this.authService.login(LoginAuthDto);
  }
}
