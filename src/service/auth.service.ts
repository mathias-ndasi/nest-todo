import { HttpStatus, Injectable } from '@nestjs/common';
import { UserHelper } from 'src/helper/user.helper';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { createUserDTO, loginUserDTO } from 'src/dto/user.dto';
import { CustomException } from 'src/exception/error-exception.filter';
import { UserEnum } from 'src/enum/user.enum';
import { SuccessResponse } from 'src/exception/success-exception.filter';

@Injectable()
export class AuthService {
  constructor(
    private readonly userHelper: UserHelper,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(userPayload: loginUserDTO) {
    const user: User = await this.userHelper.getByEmail(userPayload.email);

    if (user) {
      const validPassword = await bcrypt.compare(
        userPayload.password,
        user.password,
      );
      if (validPassword) {
        const payload = { email: userPayload.email, sub: user.id };
        const jwtToken = await this.jwtService.signAsync(payload);

        // remove the password
        delete user.password;

        return {
          ...user,
          accessToken: jwtToken,
        };
      } else {
        throw new CustomException()
          .setMessage(UserEnum.loginError)
          .setStatusCode(HttpStatus.BAD_REQUEST)
          .response();
      }
    }

    throw new CustomException()
      .setMessage(UserEnum.loginError)
      .setStatusCode(HttpStatus.BAD_REQUEST)
      .response();
  }

  async signup(userPayload: createUserDTO) {
    // Verify if user with email already exist
    const existingUser = await this.userHelper.getByEmail(userPayload.email);

    if (existingUser !== null) {
      throw new CustomException()
        .setMessage(UserEnum.userAlreadyExist)
        .response();
    }

    // Encrypt user password
    const passwordHash = await bcrypt.hash(
      userPayload.password,
      parseInt(process.env.SALT_ROUNDS),
    );
    userPayload.password = passwordHash;

    // create new user
    const newUser = await this.userHelper.create(userPayload);

    return new SuccessResponse(newUser)
      .setMessage(UserEnum.userCreatedSuccessfully)
      .setStatusCode(HttpStatus.CREATED)
      .response();
  }
}
