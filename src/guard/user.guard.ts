import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { updatePasswordDTO } from 'src/dto/user.dto';
import { UserEnum } from 'src/enum/user.enum';
import { CustomException } from 'src/exception/error-exception.filter';

@Injectable()
export class ChangePasswordGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const passwordPayload: updatePasswordDTO = request.body;

    if (passwordPayload.newPassword !== passwordPayload.confirmPassword) {
      throw new CustomException(null)
        .setMessage(UserEnum.passwordMismatch)
        .setStatusCode(HttpStatus.BAD_REQUEST)
        .response();
    }

    return true;
  }
}
