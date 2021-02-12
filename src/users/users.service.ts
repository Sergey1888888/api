import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schemas/users.schema';
import { Model } from 'mongoose';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}
  async getAll(): Promise<Users[]> {
    return this.usersModel.find().exec();
  }

  async getById(id: string): Promise<Users> {
    return this.usersModel.findById(id);
  }

  async create(usersDto: CreateUsersDto): Promise<Users> {
    const newUser = new this.usersModel(usersDto);
    return newUser.save();
  }

  async remove(id: string): Promise<Users> {
    return this.usersModel.findByIdAndDelete(id);
  }

  async update(id: string, usersDto: UpdateUsersDto): Promise<Users> {
    return this.usersModel.findByIdAndUpdate(id, usersDto, { new: true });
  }
}
