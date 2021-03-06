import { PrismaService } from '../service/prisma.service';
import { User } from '@prisma/client';
import {
  createUserDTO,
  updatePasswordDTO,
  updateUserDTO,
} from 'src/dto/user.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserHelper {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    const users = await this.prismaService.user.findMany();

    // Disconnect prisma
    this.prismaService.$disconnect();

    return users;
  }

  async getById(userId: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Disconnect prisma
    this.prismaService.$disconnect();

    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    // Disconnect prisma
    this.prismaService.$disconnect();

    return user;
  }

  async update(userId: number, userPayload: updateUserDTO): Promise<User> {
    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: userPayload,
    });

    // Disconnect prisma
    this.prismaService.$disconnect();

    return user;
  }

  async create(userPayload: createUserDTO): Promise<User> {
    const user = await this.prismaService.user.create({
      data: userPayload,
    });

    // Disconnect prisma
    this.prismaService.$disconnect();

    return user;
  }

  async remove(userId: number) {
    await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });

    // Disconnect prisma
    this.prismaService.$disconnect();

    return;
  }

  async changePassword(user: User, passwordPayload: updatePasswordDTO) {
    const hashPassword = await bcrypt.hash(
      passwordPayload.newPassword,
      parseInt(process.env.SALT_ROUNDS),
    );

    // update user in db
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashPassword,
      },
    });

    // Disconnect prisma
    this.prismaService.$disconnect();

    return;
  }
}
