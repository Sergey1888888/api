import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import fetch from 'node-fetch';
import { Realty, RealtyDocument } from './schemas/realty.schema';
import { Model, Types } from 'mongoose';
import { CreateRealtyDto } from './dto/create-realty.dto';
import { UpdateRealtyDto } from './dto/update-realty.dto';

@Injectable()
export class RealtyService {
  constructor(
    @InjectModel(Realty.name) private realtyModel: Model<RealtyDocument>,
  ) {}
  async getAll(): Promise<Realty[]> {
    return this.realtyModel.find().exec();
  }

  async paginate(limit: number, page: number): Promise<Realty[]> {
    return this.realtyModel
      .find()
      .skip((page - 1) * limit)
      .limit(+limit)
      .exec();
  }
  //MB UDALIT
  async getTotalRealty(): Promise<number> {
    const response = await this.realtyModel.find().exec();
    return response.length;
  }

  async getById(id: string): Promise<Realty> {
    if (!Types.ObjectId.isValid(id) || !(await this.realtyModel.findById(id))) {
      throw new NotFoundException('Realty does not exist!');
    }
    return this.realtyModel.findById(id);
  }

  async getByUserId(userId): Promise<any> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('Owner with userId does not exist!');
    }
    if (
      (await this.realtyModel.find({ ownerId: userId }).exec()).length === 0
    ) {
      throw new NotFoundException('Realty with this owner does not exist!');
    }
    return this.realtyModel.find({ ownerId: userId }).exec();
  }

  async create(realtyDto: CreateRealtyDto): Promise<Realty> {
    const isExist =
      (await this.realtyModel.findOne({ street: realtyDto.street })) &&
      (await this.realtyModel.findOne({
        houseNumber: realtyDto.houseNumber,
      })) &&
      (await this.realtyModel.findOne({
        apartmentNumber: realtyDto.apartmentNumber,
      }));
    if (isExist) {
      throw new ConflictException('Realty already exist!');
    }
    const response = await fetch(
      encodeURI(
        `https://eu1.locationiq.com/v1/search.php?key=pk.cfcfe11a1331ee8fb9e2e5dc4715ff1b&country=Россия&city=Волгоград&street=${realtyDto.street} ${realtyDto.houseNumber}&format=json`,
      ),
    );
    const json = await response.json();
    if (json.length === 0) {
      throw new ConflictException('Cant find realty with this address!');
    }
    realtyDto.lat = json[0].lat;
    realtyDto.long = json[0].lon;
    const realty = new this.realtyModel(realtyDto);
    return realty.save();
  }

  async update(id: string, updateRealtyDto: UpdateRealtyDto): Promise<Realty> {
    if (!Types.ObjectId.isValid(id) || !(await this.realtyModel.findById(id))) {
      throw new NotFoundException('Realty does not exist!');
    }
    return this.realtyModel.findByIdAndUpdate(id, updateRealtyDto, {
      new: true,
    });
  }
}
