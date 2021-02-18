import { IsString } from 'class-validator';

export class UpdateUsersDto {
  @IsString()
  readonly password: string;

  @IsString()
  readonly telegram: string;

  @IsString()
  readonly vk: string;

  @IsString()
  readonly whatsup: string;
}
