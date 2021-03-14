import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber, IsNumberString,
  IsString,
} from 'class-validator';

export class UpdateRealtyDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsArray()
  photos: Array<string>;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  houseNumber: string;

  @IsNumberString()
  apartmentNumber: number;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNumber()
  area: number;

  @IsNumber()
  liveArea: number;

  @IsNumber()
  kitchenArea: number;

  @IsNumber()
  landArea: number;

  @IsNumber()
  rooms: number;

  @IsNumber()
  floorsNumber: number;

  @IsNumber()
  floor: number;

  @IsNumber()
  price: number;

  @IsNumber()
  rating: number;

  @IsNumber()
  bathroom: number;

  @IsNotEmpty()
  @IsString()
  bathroomType: string;

  @IsNumber()
  balconyNumber: number;

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
  renovation: string;

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
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  lat: string;

  @IsNotEmpty()
  @IsString()
  long: string;
}
