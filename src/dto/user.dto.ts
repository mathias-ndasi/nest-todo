import { ApiProperty } from '@nestjs/swagger';

export class createUserDTO {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  address?: string;
}

export class loginUserDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class updateUserDTO {
  @ApiProperty({ required: false })
  firstName?: string;

  @ApiProperty({ required: false })
  lastName?: string;

  @ApiProperty({ required: false })
  address?: string;
}
