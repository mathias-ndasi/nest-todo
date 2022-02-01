import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../service/prisma.service';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { UserHelper } from '../helper/user.helper';
import { AuthService } from '../service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../guard/jwt.strategy';
import { Module } from '@nestjs/common';
import { TodoModule } from './todo.module';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: '../i18n',
      },
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: { expiresIn: '7d' }, // expires in 7 days
    }),
    TodoModule,
  ],
  controllers: [UserController],
  providers: [JwtStrategy, PrismaService, UserHelper, UserService, AuthService],
  exports: [PrismaService, AuthService],
})
export class AppModule {}
