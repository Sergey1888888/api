import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class UpdateRealtyDto {
  type: string;
  photos: Array<string>;
  street: string;
  houseNumber: string;
  apartmentNumber: number;
  district: string;
  area: number;
  liveArea: number;
  kitchenArea: number;
  landArea: number;
  rooms: number;
  floorsNumber: number;
  floor: number;
  price: number;
  rating: number;
  bathroom: number;
  bathroomType: string;
  balconyNumber: number;
  elevatorsNumber: number;
  wallsMaterial: string;
  buildingClass: string;
  lodgingClass: string;
  parkingSpace: boolean;
  renovation: string;
  furniture: string;
  appliances: boolean;
  internet: boolean;
  conditionerNumber: number;
  heating: boolean;
  powerSupply: boolean;
  fireExtinguishing: boolean;
  sewerage: boolean;
  gas: boolean;
  waterSupply: boolean;
  conditioning: boolean;
  ventilation: boolean;
  security: boolean;
  windowsType: string;
  ceilingHeight: number;
  concierge: boolean;
  plotType: string;
  enteringType: string;
  layoutType: string;
  territoryType: string;
  description: string;
  lat: string;
  long: string;
}
