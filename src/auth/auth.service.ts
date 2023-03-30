import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/users.schema';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(RegisterAuthDto: RegisterAuthDto) {
    const { email, password } = RegisterAuthDto;

    const verificationEmail = await this.verificationEmail(email);
    if (verificationEmail) {
      const planeToHash = await hash(password, 10);
      RegisterAuthDto = { ...RegisterAuthDto, password: planeToHash };

      return this.userModel.create(RegisterAuthDto);
    }
  }

  async login(LoginAuthDto: LoginAuthDto) {
    const { email, password } = LoginAuthDto;

    const findUser = await this.userModel.findOne({ email: email });
    if (!findUser) throw new HttpException('User not found', 404);

    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword)
      throw new HttpException('Email or Password incorrect', 403);

    const payload = { id: findUser._id, name: findUser.name };
    const token = await this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token,
    };
    return data;
  }

  async verificationEmail(email: string) {
    const verification = await this.userModel.findOne({
      email: email,
    });
    if (verification) {
      throw new HttpException('Email already exist', 403);
    }
    return true;
  }
}
