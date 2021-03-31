import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePass } from '../helpers/passwordFunctions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);
    if (user && comparePass(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      name: user._doc.name,
      surname: user._doc.surname,
      patronymic: user._doc.patronymic,
      email: user._doc.email,
      userId: user._doc._id,
      phoneNumber: user._doc.phoneNumber,
      telegram: user._doc.telegram,
      whatsup: user._doc.whatsup,
      vk: user._doc.vk,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
