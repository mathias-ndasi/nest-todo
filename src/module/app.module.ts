import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/service/prisma.service';
import { UserController } from 'src/controller/user.controller';
import { UserService } from 'src/service/user.service';
import { UserHelper } from 'src/helper/user.helper';
import { AuthService } from 'src/service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guard/jwt.strategy';
import { TodoController } from 'src/controller/todo.controller';
import { TodoService } from 'src/service/todo.service';
import { TodoHelper } from 'src/helper/todo.helper';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: { expiresIn: '7d' }, // expires in 7 days
    }),
  ],
  controllers: [UserController, TodoController],
  providers: [
    JwtStrategy,
    PrismaService,
    UserHelper,
    UserService,
    AuthService,
    TodoHelper,
    TodoService,
  ],
  exports: [PrismaService, AuthService],
})
export class AppModule {}
