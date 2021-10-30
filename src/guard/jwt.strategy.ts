import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEnum } from 'src/enum/user.enum';
import { CustomException } from 'src/exception/error-exception.filter';
import { UserHelper } from 'src/helper/user.helper';
import { jwt } from 'src/interface/jwt.interface';

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
