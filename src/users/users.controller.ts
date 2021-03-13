import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { Users } from './schemas/users.schema';
import { UpdateUsersDto } from './dto/update-users.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateImageUsersDto } from './dto/update-image-users.dto';

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

  @UseGuards(JwtAuthGuard)
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
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async updateAvatar(
    @Param('id') id: string,
    @Body() updateImageDto: UpdateImageUsersDto,
  ): Promise<string> {
    await this.usersService.updateAvatar(id, updateImageDto);
    return 'Avatar was updated!';
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
