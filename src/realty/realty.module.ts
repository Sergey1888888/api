import { Module } from '@nestjs/common';
import { RealtyService } from './realty.service';
import { RealtyController } from './realty.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Realty, RealtySchema } from './schemas/realty.schema';

@Module({
  providers: [RealtyService],
  controllers: [RealtyController],
  imports: [
    MongooseModule.forFeature([{ name: Realty.name, schema: RealtySchema }]),
  ],
})
export class RealtyModule {}
