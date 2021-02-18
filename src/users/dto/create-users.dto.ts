import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
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

  @IsNotEmpty()
  @IsMobilePhone()
  @IsString()
  readonly phoneNumber: string;

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
