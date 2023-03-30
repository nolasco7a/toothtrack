import { Injectable } from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = await new this.userModel(createUserDto);
    return createUser.save();
  }

  async findAll() {
    const users = await this.userModel.find({});
    return users;
  }

  async findOne(id: number) {
    const user = await this.userModel.findById({ _id: id });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = await this.userModel.findByIdAndUpdate({
      _id: id,
      updateUserDto,
    });

    return updateUserDto;
  }

  async remove(id: number) {
    const removeUser = await this.userModel.deleteOne({ _id: id });
    return removeUser;
  }
}
