import { Module } from '@nestjs/common';
import { TodoController } from '../controller/todo.controller';
import { TodoHelper } from '../helper/todo.helper';
import { PrismaService } from '../service/prisma.service';
import { TodoService } from '../service/todo.service';

@Module({
  controllers: [TodoController],
  providers: [PrismaService, TodoHelper, TodoService],
})
export class TodoModule {}
