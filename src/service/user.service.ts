import { HttpStatus, Injectable } from '@nestjs/common';
import { updateUserDTO } from 'src/dto/user.dto';
import { UserEnum } from 'src/enum/user.enum';
import { CustomException } from 'src/exception/error-exception.filter';
import { SuccessResponse } from 'src/exception/success-exception.filter';
import { UserHelper } from 'src/helper/user.helper';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userHelper: UserHelper,
    private readonly authService: AuthService,
  ) {}

  async findAll() {
    // Get all users
    const users = await this.userHelper.getAll();

    return new SuccessResponse(users).response();
  }

  async findOneById(userId: number) {
    // Get user with the given id from db
    const user = await this.userHelper.getById(userId);

    // Verify if user exist
    if (!user) {
      throw new CustomException()
        .setMessage(UserEnum.userNotFound)
        .setStatusCode(HttpStatus.NOT_FOUND)
        .response();
    }

    return new SuccessResponse(user).response();
  }

  async findOneByEmail(email: string) {
    // Get user with the given email from db
    const user = await this.userHelper.getByEmail(email);

    // Verify if user exist
    if (!user) {
      throw new CustomException()
        .setMessage(UserEnum.userNotFound)
        .setStatusCode(HttpStatus.NOT_FOUND)
        .response();
    }

    return new SuccessResponse(user).response();
  }

  async update(userId: number, userPayload: updateUserDTO) {
    // Get user with the given id from db
    const user = await this.userHelper.getById(userId);

    // Verify if user exist
    if (!user) {
      throw new CustomException()
        .setMessage(UserEnum.userNotFound)
        .setStatusCode(HttpStatus.NOT_FOUND)
        .response();
    }

    // Update user details
    const updatedUser = await this.userHelper.update(userId, userPayload);

    return new SuccessResponse(updatedUser)
      .setMessage(UserEnum.userUpdatedSuccessfully)
      .response();
  }

  async remove(userId: number) {
    // Get user
    const user = await this.userHelper.getById(userId);

    // Verify if user exist
    if (!user) {
      throw new CustomException()
        .setMessage(UserEnum.userNotFound)
        .setStatusCode(HttpStatus.NOT_FOUND)
        .response();
    }

    // delete user
    await this.userHelper.remove(userId);

    return new SuccessResponse(null)
      .setMessage(UserEnum.userDeletedSuccessfully)
      .setStatusCode(HttpStatus.OK)
      .response();
  }
}
