import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { updatePasswordDTO, updateUserDTO } from '../dto/user.dto';
import { UserEnum } from '../enum/user.enum';
import { CustomException } from '../exception/error-exception.filter';
import { SuccessResponse } from '../exception/success-exception.filter';
import { UserHelper } from '../helper/user.helper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userHelper: UserHelper) {}

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

    // check is email needs updates
    if (userPayload.email) {
      const existingUser = await this.userHelper.getByEmail(userPayload.email);

      if (existingUser && existingUser !== null) {
        throw new CustomException()
          .setMessage(UserEnum.userAlreadyExist)
          .response();
      }
    }

    // Update user details
    const updatedUser = await this.userHelper.update(userId, userPayload);

    return new SuccessResponse(updatedUser)
      .setMessage(UserEnum.userUpdatedSuccessfully)
      .response();
  }

  async changePassword(user: User, passwordPayload: updatePasswordDTO) {
    // verify password
    const validPassword = await bcrypt.compare(
      passwordPayload.oldPassword,
      user.password,
    );

    if (!validPassword) {
      throw new CustomException(null)
        .setMessage(UserEnum.passwordInvalid)
        .setStatusCode(HttpStatus.BAD_REQUEST)
        .response();
    }

    // perform updates
    await this.userHelper.changePassword(user, passwordPayload);

    return new SuccessResponse(null)
      .setMessage(UserEnum.passwordMismatch)
      .setStatusCode(HttpStatus.OK)
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
