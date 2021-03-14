import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { InjectModel } from '@nestjs/mongoose';
import fetch from 'node-fetch';
import { Users, UsersDocument } from './schemas/users.schema';
import { Model, Types } from 'mongoose';
import { UpdateUsersDto } from './dto/update-users.dto';
import { hashPass } from '../helpers/passwordFunctions';
import tokenGenerator from '../helpers/tokenGenerator';
import { UpdateImageUsersDto } from './dto/update-image-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}
  async getAll(): Promise<Users[]> {
    return this.usersModel.find().exec();
  }

  async getByEmail(email: string): Promise<Users> {
    return this.usersModel.findOne({ email: email });
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
    const user = new this.usersModel(hashPass(usersDto, 10));
    return user.save();
  }

  async remove(id: string): Promise<Users> {
    if (!Types.ObjectId.isValid(id) || !(await this.usersModel.findById(id))) {
      throw new NotFoundException('User does not exist!');
    }
    return this.usersModel.findByIdAndDelete(id);
  }

  async updateAvatar(
    id: string,
    updateImageDto: UpdateImageUsersDto,
  ): Promise<Users> {
    if (!Types.ObjectId.isValid(id) || !(await this.usersModel.findById(id))) {
      throw new NotFoundException('User does not exist!');
    }
    const token = await tokenGenerator();
    //TODO:
    // НАСТРОИТЬ ЭТО
    //
    // const formdata = new FormData();
    // formdata.append('image', updateImageDto.avatar);
    //
    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     Authorization: 'Client-ID b4ab0309e1d9839',
    //   },
    //   body: formdata,
    // };
    //
    // fetch('https://api.imgur.com/3/image', requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);
    //     updateImageDto.avatar = result.data.link;
    //   })
    //   .catch((error) => console.log('error', error));
    return this.usersModel.findByIdAndUpdate(id, updateImageDto, { new: true });
  }

  async update(id: string, updateUsersDto: UpdateUsersDto): Promise<Users> {
    if (!Types.ObjectId.isValid(id) || !(await this.usersModel.findById(id))) {
      throw new NotFoundException('User does not exist!');
    }
    if (updateUsersDto.password) {
      return this.usersModel.findByIdAndUpdate(id, hashPass(updateUsersDto, 10), {
        new: true,
      });
    }
    return this.usersModel.findByIdAndUpdate(id, updateUsersDto, { new: true });
  }
}
