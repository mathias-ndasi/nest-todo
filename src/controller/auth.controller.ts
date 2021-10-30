import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { createUserDTO, loginUserDTO } from 'src/dto/user.dto';
import { AuthService } from 'src/service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
