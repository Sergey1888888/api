import { Module } from '@nestjs/common';
import { RealtyService } from './realty.service';
import { RealtyController } from './realty.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Realty, RealtySchema } from './schemas/realty.schema';
import { PhotosModule } from '../photos/photos.module';

@Module({
  providers: [RealtyService],
  controllers: [RealtyController],
  imports: [
    MongooseModule.forFeature([{ name: Realty.name, schema: RealtySchema }]),
    PhotosModule,
  ],
})
export class RealtyModule {}
