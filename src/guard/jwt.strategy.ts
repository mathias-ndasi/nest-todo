import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEnum } from '../enum/user.enum';
import { CustomException } from '../exception/error-exception.filter';
import { UserHelper } from '../helper/user.helper';
import { jwt } from '../interface/jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userHelper: UserHelper) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_SECRET,
    });
  }

  async validate(payload: jwt) {
    const user: User = await this.userHelper.getByEmail(payload.email);

    if (!user) {
      throw new CustomException()
        .setMessage(UserEnum.invalidAccessToken)
        .setStatusCode(HttpStatus.UNAUTHORIZED)
        .response();
    }

    return user;
  }
}
