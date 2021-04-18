import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Photos, PhotosSchema } from './schemas/photos.schema';

@Module({
  providers: [PhotosService],
  controllers: [PhotosController],
  imports: [
    MongooseModule.forFeature([{ name: Photos.name, schema: PhotosSchema }]),
  ],
  exports: [PhotosService],
})
export class PhotosModule {}
