import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photos, PhotosDocument } from './schemas/photos.schema';

@Injectable()
export class PhotosService {
  constructor(
    @InjectModel(Photos.name) private photosModel: Model<PhotosDocument>,
  ) {}

  async createByRealtyId(
    realtyId: string,
    hashes: Array<any>,
    photos: Array<string>,
  ) {
    await this.deleteByRealtyId(realtyId);
    for (let i = 0; i < photos.length; i++) {
      const photoToSave = new this.photosModel({
        est_id: realtyId,
        URL: photos[i],
        hash: hashes[i].hash,
      });
      await photoToSave.save();
    }
  }

  async deleteByRealtyId(realtyId: string) {
    await this.photosModel.deleteMany({ est_id: realtyId });
  }
}
