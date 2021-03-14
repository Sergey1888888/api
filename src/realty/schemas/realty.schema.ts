import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RealtyDocument = Realty & Document;

@Schema()
export class Realty {
  @Prop({ Number, required: false, default: Date.now() })
  created_at: number;
  @Prop({ String, required: true })
  type: string;
  @Prop({ Array, required: false, default: null })
  photos: Array<string>;
  @Prop({ String, required: true })
  street: string;
  @Prop({ String, required: true })
  houseNumber: string;
  @Prop({ Number, required: false, default: null })
  apartmentNumber: number;
  @Prop({ String, required: true })
  district: string;
  @Prop({ Number, required: true })
  area: number;
  @Prop({ Number, required: false, default: null })
  liveArea: number;
  @Prop({ Number, required: false, default: null })
  kitchenArea: number;
  @Prop({ Number, required: false, default: null })
  landArea: number;
  @Prop({ Number, required: true })
  rooms: number;
  @Prop({ Number, required: false, default: null })
  floorsNumber: number;
  @Prop({ Number, required: true })
  floor: number;
  @Prop({ Number, required: true })
  price: number;
  @Prop({ Number, required: false, default: null })
  rating: number;
  @Prop({ Number, required: false, default: null })
  bathroom: number;
  @Prop({ String, required: false, default: null })
  bathroomType: string;
  @Prop({ Number, required: false, default: null })
  balconyNumber: number;
  @Prop({ Number, required: false, default: null })
  elevatorsNumber: number;
  @Prop({ String, required: false, default: null })
  wallsMaterial: string;
  @Prop({ String, required: false, default: null })
  buildingClass: string;
  @Prop({ String, required: false, default: null })
  lodgingClass: string;
  @Prop({ Boolean, required: false, default: null })
  parkingSpace: boolean;
  @Prop({ String, required: false, default: null })
  renovation: string;
  @Prop({ String, required: false, default: null })
  furniture: string;
  @Prop({ Boolean, required: false, default: null })
  appliances: boolean;
  @Prop({ Boolean, required: false, default: null })
  internet: boolean;
  @Prop({ Number, required: false, default: null })
  conditionerNumber: number;
  @Prop({ Boolean, required: false, default: null })
  heating: boolean;
  @Prop({ Boolean, required: false, default: null })
  powerSupply: boolean;
  @Prop({ Boolean, required: false, default: null })
  fireExtinguishing: boolean;
  @Prop({ Boolean, required: false, default: null })
  sewerage: boolean;
  @Prop({ Boolean, required: false, default: null })
  gas: boolean;
  @Prop({ Boolean, required: false, default: null })
  waterSupply: boolean;
  @Prop({ Boolean, required: false, default: null })
  conditioning: boolean;
  @Prop({ Boolean, required: false, default: null })
  ventilation: boolean;
  @Prop({ Boolean, required: false, default: null })
  security: boolean;
  @Prop({ String, required: false, default: null })
  windowsType: string;
  @Prop({ Number, required: false, default: null })
  ceilingHeight: number;
  @Prop({ Boolean, required: false, default: null })
  concierge: boolean;
  @Prop({ String, required: false, default: null })
  plotType: string;
  @Prop({ String, required: false, default: null })
  enteringType: string;
  @Prop({ String, required: false, default: null })
  layoutType: string;
  @Prop({ String, required: false, default: null })
  territoryType: string;
  @Prop({ String, required: true })
  description: string;
  @Prop({ String, required: true })
  lat: string;
  @Prop({ String, required: true })
  long: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
  ownerId: mongoose.Schema.Types.ObjectId;
}

export const RealtySchema = SchemaFactory.createForClass(Realty);
