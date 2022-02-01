import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  createUserDTO,
  loginUserDTO,
  updatePasswordDTO,
  updateUserDTO,
} from '../dto/user.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { ChangePasswordGuard } from '../guard/user.guard';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@ApiTags('Account')
@Controller('account')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiCreatedResponse()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() userPayload: createUserDTO) {
    return this.authService.signup(userPayload);
  }

  @ApiCreatedResponse()
  @Post('login')
  async login(@Body() userPayload: loginUserDTO) {
    return await this.authService.authenticate(userPayload);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async getSingleUserById(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.findOneById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Put(':userId')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() userPayload: updateUserDTO,
  ) {
    return await this.userService.update(userId, userPayload);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete(':userId')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.remove(userId);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(ChangePasswordGuard)
  @ApiBearerAuth('JWT-auth')
  @Put('change/password')
  @HttpCode(HttpStatus.OK)
  async changeUserPassword(
    @Request() req,
    @Body() passwordPayload: updatePasswordDTO,
  ) {
    return this.userService.changePassword(req.user, passwordPayload);
  }
}
