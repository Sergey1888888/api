import { ObjectId } from 'mongoose';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';
import { SaleTypes } from '../schemas/realty.schema';

export class CreateRealtyDto {
  created_at: number;

  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @IsArray()
  photos: Array<string>;

  @IsNotEmpty()
  @IsString()
  readonly street: string;

  @IsNotEmpty()
  @IsString()
  readonly houseNumber: string;

  @IsNumberString()
  readonly apartmentNumber: number;

  @IsNotEmpty()
  @IsString()
  readonly district: string;

  @IsNotEmpty()
  @IsNumber()
  readonly area: number;

  @IsNumber()
  readonly liveArea: number;

  @IsNumber()
  readonly kitchenArea: number;

  @IsNotEmpty()
  @IsNumber()
  readonly rooms: number;

  @IsNotEmpty()
  @IsString()
  readonly renovation: string;

  @IsNotEmpty()
  @IsNumber()
  readonly floor: number;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNumber()
  readonly rating: number;

  @IsNumber()
  readonly bathroom: number;

  @IsNotEmpty()
  @IsString()
  readonly bathroomType: string;

  @IsNumber()
  readonly balconyNumber: number;

  @IsNotEmpty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  lat: string;

  @IsNotEmpty()
  @IsString()
  long: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly ownerId: ObjectId;

  @IsNumber()
  landArea: number;

  @IsNumber()
  floorsNumber: number;

  @IsNumber()
  elevatorsNumber: number;

  @IsNotEmpty()
  @IsString()
  wallsMaterial: string;

  @IsNotEmpty()
  @IsString()
  buildingClass: string;

  @IsNotEmpty()
  @IsString()
  lodgingClass: string;

  @IsBoolean()
  parkingSpace: boolean;

  @IsNotEmpty()
  @IsString()
  furniture: string;

  @IsBoolean()
  appliances: boolean;

  @IsBoolean()
  internet: boolean;

  @IsNumber()
  conditionerNumber: number;

  @IsBoolean()
  heating: boolean;

  @IsBoolean()
  powerSupply: boolean;

  @IsBoolean()
  fireExtinguishing: boolean;

  @IsBoolean()
  sewerage: boolean;

  @IsBoolean()
  gas: boolean;

  @IsBoolean()
  waterSupply: boolean;

  @IsBoolean()
  conditioning: boolean;

  @IsBoolean()
  ventilation: boolean;

  @IsBoolean()
  security: boolean;

  @IsNotEmpty()
  @IsString()
  windowsType: string;

  @IsNumber()
  ceilingHeight: number;

  @IsBoolean()
  concierge: boolean;

  @IsNotEmpty()
  @IsString()
  plotType: string;

  @IsNotEmpty()
  @IsString()
  enteringType: string;

  @IsNotEmpty()
  @IsString()
  layoutType: string;

  @IsNotEmpty()
  @IsString()
  territoryType: string;

  @IsNotEmpty()
  @IsEnum(SaleTypes)
  encumbranceType: SaleTypes;

  realtor: boolean;
  suspicious: boolean;
  infrastructureRating: any;
}
