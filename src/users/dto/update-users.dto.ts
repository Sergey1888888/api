import { IsString, IsUrl } from 'class-validator';

export class UpdateUsersDto {
  @IsString()
  readonly password: string;

  @IsString()
  avatar: string;

  @IsString()
  readonly telegram: string;

  @IsString()
  readonly vk: string;

  @IsString()
  readonly whatsup: string;
}
