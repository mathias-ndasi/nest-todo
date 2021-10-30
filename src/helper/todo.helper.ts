import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { createTodoDTO, updateTodoDTO } from 'src/dto/todo.dto';
import { PrismaService } from 'src/service/prisma.service';

@Injectable()
export class TodoHelper {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(todoId: number): Promise<Todo> {
    const todo = await this.prismaService.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    // Disconnect prisma
    this.prismaService.$disconnect();

    return todo;
  }

  async getAll(): Promise<Todo[]> {
    const todos = await this.prismaService.todo.findMany();

    // Disconnect prisma
    this.prismaService.$disconnect();

    return todos;
  }

  async getAllByUserId(userId: number): Promise<Todo[]> {
    const todos = await this.prismaService.todo.findMany({
      where: {
        userId: userId,
      },
    });

    // Disconnect prisma
    this.prismaService.$disconnect();

    return todos;
  }

  async remove(todoId: number): Promise<Todo> {
    await this.prismaService.todo.delete({
      where: {
        id: todoId,
      },
    });

    // Disconnect prisma
    this.prismaService.$disconnect();

    return;
  }

  async create(todoPayload: createTodoDTO): Promise<Todo> {
    const todo = await this.prismaService.todo.create({
      data: todoPayload,
    });

    // Disconnect prisma
    this.prismaService.$disconnect();

    return todo;
  }

  async update(todoId: number, todoPayload: updateTodoDTO): Promise<Todo> {
    const todo = await this.prismaService.todo.update({
      where: {
        id: todoId,
      },
      data: todoPayload,
    });

    // Disconnect prisma
    this.prismaService.$disconnect();

    return todo;
  }
}
