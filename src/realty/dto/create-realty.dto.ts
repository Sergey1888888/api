import { ObjectId } from 'mongoose';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

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
  @IsNumberString()
  readonly houseNumber: string;

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

  readonly renovation: string;

  @IsNotEmpty()
  @IsNumber()
  readonly floor: number;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  readonly rating: number;

  readonly bathroom: number;

  readonly bathroomType: string;

  @IsNumber()
  readonly balconyNumber: number;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  lat: string;

  long: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly ownerId: ObjectId;
}
