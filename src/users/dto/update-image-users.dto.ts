import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateImageUsersDto {
  @IsNotEmpty()
  @IsString()
  avatar: string;
}
