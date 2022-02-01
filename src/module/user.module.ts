import { Module } from '@nestjs/common';
import { UserController } from 'src/controller/user.controller';
import { UserHelper } from 'src/helper/user.helper';
import { PrismaService } from 'src/service/prisma.service';
import { UserService } from 'src/service/user.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserHelper, UserService],
})
export class UserModule {}
