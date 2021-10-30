import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { updateUserDTO } from 'src/dto/user.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { UserService } from 'src/service/user.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@ApiTags('Account')
@Controller('account')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async getSingleUserById(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.findOneById(userId);
  }

  @Put(':userId')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() userPayload: updateUserDTO,
  ) {
    return await this.userService.update(userId, userPayload);
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.remove(userId);
  }
}
