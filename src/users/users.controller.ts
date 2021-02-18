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
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { Users } from './schemas/users.schema';
import { UpdateUsersDto } from './dto/update-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getAll(): Promise<Users[]> {
    return await this.usersService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Users> {
    return await this.usersService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  async create(@Body() createUsersDto: CreateUsersDto): Promise<string> {
    await this.usersService.create(createUsersDto);
    return 'User was created!';
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    await this.usersService.remove(id);
    return 'User was deleted!';
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsersDto: UpdateUsersDto,
  ): Promise<string> {
    await this.usersService.update(id, updateUsersDto);
    return 'User was changed!';
  }
}
