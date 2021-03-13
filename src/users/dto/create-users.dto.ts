import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString, IsUrl,
} from 'class-validator';

export class CreateUsersDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly surname: string;

  @IsNotEmpty()
  @IsString()
  readonly patronymic: string;

  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsString()
  readonly telegram: string;

  @IsString()
  readonly vk: string;

  @IsString()
  readonly whatsup: string;

  @IsBoolean()
  readonly isAdmin: boolean;
}
