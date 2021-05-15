import {
  BadRequestException,
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
import {
  filterMaker,
  infrastructureRatingMaker,
  ratingObjectMaker,
  sortMaker,
} from '../helpers/objectMaker';
import { Express, json } from 'express';
import tokenGenerator from '../helpers/tokenGenerator';
import { PhotosService } from '../photos/photos.service';

export interface IFilterObject {
  type: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  rooms: number | null;
  area: number | null;
  district: string | null;
  street: string | null;
  encumbranceType: number | null;
}

export interface ISortObject {
  rooms: number;
  price: number;
  area: number;
}

@Injectable()
export class RealtyService {
  constructor(
    @InjectModel(Realty.name) private realtyModel: Model<RealtyDocument>,
    private readonly photosService: PhotosService,
  ) {}

  async getAll(filter: IFilterObject): Promise<Realty[]> {
    return this.realtyModel.find(filterMaker(filter)).exec();
  }

  async paginate(
    limit: number,
    page: number,
    filter: IFilterObject,
    sort: ISortObject,
  ): Promise<Realty[]> {
    if (filter.maxPrice < filter.minPrice)
      throw new BadRequestException('minPrice must be less than maxPrice');
    const realties = await this.realtyModel
      .find(filterMaker(filter))
      .sort(sortMaker(sort))
      .skip((page - 1) * limit)
      .limit(+limit)
      .exec();
    const toUpdateRealties = realties.filter((realty) => {
      if (
        realty.infrastructureRating === null ||
        (Date.now() - realty.infrastructureRating.created_at) /
          (1000 * 3600 * 24) >
          180
      ) {
        return realty;
      }
    });
    if (toUpdateRealties.length === 0) {
      const responseAllRating = await fetch(
        'https://rating-service-zis.herokuapp.com/rating',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'user-agent': 'PostmanRuntime/7.26.10',
          },
          body: JSON.stringify(
            ratingObjectMaker(realties, filterMaker(filter)),
          ),
        },
      );
      const jsonAllRating = await responseAllRating.json();
      if (jsonAllRating.code != 0) {
        throw new ConflictException('Error');
      }
      return jsonAllRating.data;
    }
    const ratings: Array<any> = [];
    for (const realty of toUpdateRealties) {
      const responseRating = await fetch(
        'https://infrastructure-service-zis.herokuapp.com/infrastructure/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'user-agent': 'PostmanRuntime/7.26.10',
          },
          body: JSON.stringify([realty]),
        },
      );
      const jsonRating = await responseRating.json();
      if (jsonRating.code != 0) {
        throw new ConflictException('Error');
      }
      ratings.push(jsonRating.data[0]);
    }
    const toSave = realties.map((realty) => {
      const rating = ratings.filter((item) => item._id == realty._id);
      if (rating.length != 0) {
        realty.infrastructureRating = infrastructureRatingMaker(
          rating[0].Rating,
        );
        return realty;
      }
    });
    for (const item of toSave) {
      await this.update(item._id, item);
    }
    return this.realtyModel
      .find(filterMaker(filter))
      .sort(sortMaker(sort))
      .skip((page - 1) * limit)
      .limit(+limit)
      .exec();
  }

  async getTotalRealties(filters: IFilterObject): Promise<number> {
    const total = await this.realtyModel.find(filterMaker(filters)).exec();
    return total.length;
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
    const savedRealty = await realty.save();
    const responseRating = await fetch(
      'https://infrastructure-service-zis.herokuapp.com/infrastructure/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([savedRealty]),
      },
    );
    const jsonRating = await responseRating.json();
    if (jsonRating.length === 0 || jsonRating.code != 0) {
      throw new ConflictException('Error');
    }
    savedRealty.infrastructureRating = infrastructureRatingMaker(
      jsonRating.data[0].Rating,
    );
    return await savedRealty.save();
  }

  async update(id: string, updateRealtyDto: UpdateRealtyDto): Promise<Realty> {
    if (!Types.ObjectId.isValid(id) || !(await this.realtyModel.findById(id))) {
      throw new NotFoundException('Realty does not exist!');
    }
    const { lat, long } = await this.realtyModel.findById(id);
    if (lat !== updateRealtyDto.lat && long !== updateRealtyDto.long) {
      const response = await fetch(
        encodeURI(
          `https://eu1.locationiq.com/v1/search.php?key=pk.cfcfe11a1331ee8fb9e2e5dc4715ff1b&country=Россия&city=Волгоград&street=${updateRealtyDto.street} ${updateRealtyDto.houseNumber}&format=json`,
        ),
      );
      const json = await response.json();
      if (json.length === 0) {
        throw new ConflictException('Cant find realty with this address!');
      }
      updateRealtyDto.lat = json[0].lat;
      updateRealtyDto.long = json[0].lon;
      const dataForInfr = [{ ...updateRealtyDto, _id: id }];
      const responseRating = await fetch(
        'https://infrastructure-service-zis.herokuapp.com/infrastructure/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataForInfr),
        },
      );
      const jsonRating = await responseRating.json();
      if (jsonRating.length === 0 || jsonRating.code != 0) {
        throw new ConflictException('Error');
      }
      updateRealtyDto.infrastructureRating = infrastructureRatingMaker(
        jsonRating.data[0].Rating,
      );
    }
    return this.realtyModel.findByIdAndUpdate(id, updateRealtyDto, {
      new: true,
    });
  }

  async updatePhotos(
    id: string,
    files: any,
    toSave: Array<string>,
  ): Promise<Realty> {
    if (!Types.ObjectId.isValid(id) || !(await this.realtyModel.findById(id))) {
      throw new NotFoundException('Realty does not exist!');
    }
    const urls = [];
    for (const photo of toSave) {
      urls.push(photo);
    }
    await tokenGenerator();
    for (let i = 0; i < files.length; i++) {
      const base64 = files[i].buffer.toString('base64');
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
      urls.push(link);
    }
    const photosWithId = [];
    for (const photo of urls) {
      photosWithId.push({ _id: id, url: photo });
    }
    const responseHashes = await fetch(
      'https://imagehash-service-zis.herokuapp.com/imagehash/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(photosWithId),
      },
    );
    const jsonHashes = await responseHashes.json();
    const hashes = JSON.parse(jsonHashes.data);
    console.log(hashes);
    if (jsonHashes.length === 0 || jsonHashes.code != 0) {
      throw new ConflictException('Error');
    }
    await this.photosService.createByRealtyId(id, hashes, urls);
    return this.realtyModel.findByIdAndUpdate(
      id,
      { photos: urls },
      {
        new: true,
      },
    );
  }

  async delete(id: string): Promise<Realty> {
    if (!Types.ObjectId.isValid(id) || !(await this.realtyModel.findById(id))) {
      throw new NotFoundException('Realty does not exist!');
    }
    return this.realtyModel.findByIdAndDelete(id);
  }
}
