import { ObjectId } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class PhotosDto {
  @IsNotEmpty()
  @IsMongoId()
  est_id: ObjectId;

  @IsNotEmpty()
  URL: string;
  hash: string;
}
