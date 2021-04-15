import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { Users } from './schemas/users.schema';
import { UpdateUsersDto } from './dto/update-users.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Users[]> {
    return await this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Users> {
    return await this.usersService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUsersDto: CreateUsersDto): Promise<string> {
    await this.usersService.create(createUsersDto);
    return 'User was created!';
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    await this.usersService.remove(id);
    return 'User was deleted!';
  }

  @UseGuards(JwtAuthGuard)
  @Put('upload/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    if (!avatar?.originalname.match(/\.(jpg|jpeg|png|)$/)) {
      return new BadRequestException('Only png, jpeg are allowed!');
    }
    const profile = await this.usersService.updateAvatar(id, avatar);
    return {
      name: avatar.originalname,
      status: 'done',
      url: profile.avatar,
      thumbUrl: profile.avatar,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsersDto: UpdateUsersDto,
  ): Promise<string> {
    await this.usersService.update(id, updateUsersDto);
    return 'User was changed!';
  }
}
