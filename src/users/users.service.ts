import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schemas/users.schema';
import { Model, Types } from 'mongoose';
import { UpdateUsersDto } from './dto/update-users.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}
  async getAll(): Promise<Users[]> {
    return this.usersModel.find().exec();
  }

  async getById(id: string): Promise<Users> {
    if (!Types.ObjectId.isValid(id) || !(await this.usersModel.findById(id))) {
      throw new NotFoundException('User does not exist!');
    }
    return this.usersModel.findById(id);
  }

  async create(usersDto: CreateUsersDto): Promise<Users> {
    if (await this.usersModel.findOne({ email: usersDto.email })) {
      throw new ConflictException('Email already exist!');
    } else if (
      await this.usersModel.findOne({ phoneNumber: usersDto.phoneNumber })
    ) {
      throw new ConflictException('Phone number already exist!');
    }
    const hash = bcrypt.hashSync(usersDto.password, 10);
    const newUser = { ...usersDto, password: hash };
    const user = new this.usersModel(newUser);
    return await user.save();
  }

  async remove(id: string): Promise<Users> {
    if (!Types.ObjectId.isValid(id) || !(await this.usersModel.findById(id))) {
      throw new NotFoundException('User does not exist!');
    }
    return this.usersModel.findByIdAndDelete(id);
  }

  async update(id: string, usersDto: UpdateUsersDto): Promise<Users> {
    if (!Types.ObjectId.isValid(id) || !(await this.usersModel.findById(id))) {
      throw new NotFoundException('User does not exist!');
    }
    if (usersDto.password) {
      const hash = bcrypt.hashSync(usersDto.password, 10);
      const newUser = { ...usersDto, password: hash };
      return this.usersModel.findByIdAndUpdate(id, newUser, { new: true });
    }
    return this.usersModel.findByIdAndUpdate(id, usersDto, { new: true });
  }
}
