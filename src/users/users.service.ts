import {
  BadGatewayException,
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
import { Express } from 'express';

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
    const requestOptions = {
      method: 'POST',
      headers: {
        'PRIVATE-KEY': 'e5999050-82b6-4266-821e-1ac2a2f93e62',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user._id,
        secret: usersDto.password,
        custom_json: {
          username: `${usersDto.surname} ${usersDto.name}`,
        },
      }),
    };
    const response = await fetch(
      'https://api.chatengine.io/users/',
      requestOptions,
    );
    const json = await response.json();
    user.userChatId = json.id;
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
    imageFile: Express.Multer.File,
  ): Promise<Users> {
    const user = await this.usersModel.findById(id);
    if (!Types.ObjectId.isValid(id) || !user) {
      throw new NotFoundException('User does not exist!');
    }
    await tokenGenerator();
    const base64 = imageFile.buffer.toString('base64');
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Client-ID b4ab0309e1d9839',
        'content-type': 'multipart/form-data',
      },
      body: base64,
    };
    const response = await fetch(
      'https://api.imgur.com/3/image',
      requestOptions,
    );
    const json = await response.json();
    const link = json.data.link;
    const requestOptionsChat = {
      method: 'PATCH',
      headers: {
        'PRIVATE-KEY': 'e5999050-82b6-4266-821e-1ac2a2f93e62',
        'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify({
        avatar: imageFile,
      }),
    };
    const responseChat = await fetch(
      `https://api.chatengine.io/users/${user.userChatId}`,
      requestOptionsChat,
    );
    return this.usersModel.findByIdAndUpdate(
      id,
      { avatar: link },
      { new: true },
    );
  }

  async update(id: string, updateUsersDto: UpdateUsersDto): Promise<Users> {
    if (!Types.ObjectId.isValid(id) || !(await this.usersModel.findById(id))) {
      throw new NotFoundException('User does not exist!');
    }
    if (updateUsersDto.password) {
      return this.usersModel.findByIdAndUpdate(
        id,
        hashPass(updateUsersDto, 10),
        {
          new: true,
        },
      );
    }
    return this.usersModel.findByIdAndUpdate(id, updateUsersDto, { new: true });
  }
}
