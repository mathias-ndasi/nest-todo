import { ApiProperty } from '@nestjs/swagger';

export class createTodoDTO {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  userId: number;
}

export class updateTodoDTO {
  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false })
  description?: string;
}
