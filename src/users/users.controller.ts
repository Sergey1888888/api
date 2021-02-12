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
  getAll(): Promise<Users[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Users> {
    return this.usersService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createUsersDto: CreateUsersDto): Promise<Users> {
    return this.usersService.create(createUsersDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Users> {
    return this.usersService.remove(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsersDto: UpdateUsersDto,
  ): Promise<Users> {
    return this.usersService.update(id, updateUsersDto);
  }
}
