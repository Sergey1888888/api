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
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RealtyService } from './realty.service';
import { Realty } from './schemas/realty.schema';
import { CreateRealtyDto } from './dto/create-realty.dto';
import { UpdateRealtyDto } from './dto/update-realty.dto';
import { Express } from 'express';

import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('realty')
export class RealtyController {
  constructor(private readonly realtyService: RealtyService) {}
  @Get('/coords')
  async all(): Promise<
    { type: string; rooms: number; photo: string; lat: number; long: number }[]
  > {
    const realties = await this.realtyService.getAll();
    const coords = realties.map((realty: any) => ({
      id: realty._id,
      type: realty.type,
      rooms: realty.rooms,
      photo: realty.photos[0],
      street: realty.street,
      houseNumber: realty.houseNumber,
      area: realty.area,
      lat: parseFloat(realty.lat),
      long: parseFloat(realty.long),
    }));
    return coords;
  }

  @Get('/')
  async GetAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sort')
    sort,
    @Query('filter')
    filter,
  ): Promise<Realty[]> {
    let jsonSort = {
      rooms: null,
      price: 1,
      area: null,
    };
    try {
      jsonSort = JSON.parse(sort);
    } catch (e) {
      jsonSort = {
        rooms: null,
        price: 1,
        area: null,
      };
    }
    let jsonFilter = {
      type: null,
      minPrice: null,
      maxPrice: null,
      rooms: null,
      area: null,
      district: null,
      street: null,
      encumbranceType: null,
    };
    try {
      jsonFilter = JSON.parse(filter);
    } catch (e) {
      jsonFilter = {
        type: null,
        minPrice: null,
        maxPrice: null,
        rooms: null,
        area: null,
        district: null,
        street: null,
        encumbranceType: null,
      };
    }
    limit = limit > 100 ? 100 : limit;
    return this.realtyService.paginate(limit, page, jsonFilter, jsonSort);
  }

  @Get('total')
  async getTotalRealties(@Query('filter') filter): Promise<number> {
    let jsonFilter = {
      type: null,
      minPrice: null,
      maxPrice: null,
      rooms: null,
      area: null,
      district: null,
      street: null,
      encumbranceType: null,
    };
    try {
      jsonFilter = JSON.parse(filter);
    } catch (e) {
      jsonFilter = {
        type: null,
        minPrice: null,
        maxPrice: null,
        rooms: null,
        area: null,
        district: null,
        street: null,
        encumbranceType: null,
      };
    }
    return this.realtyService.getTotalRealties(jsonFilter);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Realty> {
    return this.realtyService.getById(id);
  }

  @Get('owner/:userId')
  async getAllByUserId(@Param('userId') userId: string): Promise<Realty> {
    return this.realtyService.getByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  async create(@Body() createRealtyDto: CreateRealtyDto): Promise<string> {
    const realty: any = await this.realtyService.create(createRealtyDto);
    return realty._id;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRealtyDto: UpdateRealtyDto,
  ): Promise<string> {
    await this.realtyService.update(id, updateRealtyDto);
    return 'Realty was changed!';
  }

  @UseGuards(JwtAuthGuard)
  @Put('photos/:id')
  @UseInterceptors(FilesInterceptor('files'))
  async updatePhotos(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File,
    @Body() photosToSave: string,
  ): Promise<string> {
    const toSave = JSON.parse(photosToSave['photosToSave']);
    await this.realtyService.updatePhotos(id, files, toSave);
    return 'Realty was changed!';
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    await this.realtyService.delete(id);
    return 'Realty was changed!';
  }
}
