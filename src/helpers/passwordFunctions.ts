// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
import { CreateUsersDto } from '../users/dto/create-users.dto';
import { UpdateUsersDto } from '../users/dto/update-users.dto';

export function hashPass(user: CreateUsersDto | UpdateUsersDto, salt: number) {
  const hash = bcrypt.hashSync(user.password, salt);
  return { ...user, password: hash };
}

export function comparePass(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
