import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RealtyService } from './realty.service';
import { Realty } from './schemas/realty.schema';
import { CreateRealtyDto } from './dto/create-realty.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUsersDto } from '../users/dto/update-users.dto';
import { UpdateRealtyDto } from './dto/update-realty.dto';

@Controller('realty')
export class RealtyController {
  constructor(private readonly realtyService: RealtyService) {}
  @Get('/all')
  async all(): Promise<Realty[]> {
    return this.realtyService.getAll();
  }

  @Get('/')
  async GetAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    // @Query('sort') sort = text,
    // @Query('filter') filter = text,
  ): Promise<Realty[]> {
    limit = limit > 100 ? 100 : limit;
    return this.realtyService.paginate(limit, page);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Realty> {
    return this.realtyService.getById(id);
  }

  @Get('owner/:userId')
  async getAllByUserId(@Param('userId') userId: string): Promise<Realty> {
    return this.realtyService.getByUserId(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  async create(@Body() createRealtyDto: CreateRealtyDto): Promise<string> {
    await this.realtyService.create(createRealtyDto);
    return 'Realty was created!';
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRealtyDto: UpdateRealtyDto,
  ): Promise<string> {
    await this.realtyService.update(id, updateRealtyDto);
    return 'Realty was changed!';
  }
}
