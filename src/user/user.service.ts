import { Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  // delegated function to register auth module
  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   const createUser = await new this.userModel(createUserDto);
  //   return createUser.save();
  // }

  async findAll() {
    const users = await this.userModel.find({}).select('-password');
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById({ _id: id }).select('-password');
    return user;
  }

  async update(id: string, updateUserDto: any) {
    const updateUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );

    return updateUser;
  }

  async remove(id: string) {
    const removeUser = await this.userModel.deleteOne({ _id: id });
    return removeUser;
  }
}
