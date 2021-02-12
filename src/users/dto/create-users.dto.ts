export class CreateUsersDto {
  readonly name: string;
  readonly surname: string;
  readonly patronymic: string;
  readonly phoneNumber: string;
  readonly email: string;
  readonly password: string;
  readonly telegram: string;
  readonly vk: string;
  readonly whatsup: string;
  readonly isAdmin: boolean;
}
