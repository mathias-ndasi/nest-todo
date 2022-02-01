import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { createTodoDTO, updateTodoDTO } from '../dto/todo.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { TodoService } from '../service/todo.service';

@UseGuards(JwtAuthGuard)
@ApiBasicAuth('JWT-auth')
@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.todoService.findAll();
  }

  @Get(':todoId')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('todoId', ParseIntPipe) todoId: number) {
    return await this.todoService.findById(todoId);
  }

  @Get('user')
  @HttpCode(HttpStatus.OK)
  async getByUserId(@Request() req: any) {
    return await this.todoService.findByUserId(req.user);
  }

  @Put(':todoId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('todoId', ParseIntPipe) todoId: number,
    @Body() todoPayload: updateTodoDTO,
  ) {
    return await this.todoService.update(todoId, todoPayload);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Request() req: any, @Body() todoPayload: createTodoDTO) {
    return await this.todoService.create(req.user, todoPayload);
  }
}
