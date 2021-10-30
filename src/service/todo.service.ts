import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { createTodoDTO, updateTodoDTO } from 'src/dto/todo.dto';
import { TodoEnum } from 'src/enum/todo.enum';
import { CustomException } from 'src/exception/error-exception.filter';
import { SuccessResponse } from 'src/exception/success-exception.filter';
import { TodoHelper } from 'src/helper/todo.helper';

@Injectable()
export class TodoService {
  constructor(private readonly todoHelper: TodoHelper) {}

  async findAll() {
    return await this.todoHelper.getAll();
  }

  async findById(todoId: number) {
    const todo = await this.todoHelper.getById(todoId);

    // Verify if todo exist
    if (!todo) {
      throw new CustomException()
        .setMessage(TodoEnum.todoNotFound)
        .setStatusCode(HttpStatus.NOT_FOUND)
        .response();
    }

    return new SuccessResponse(todo).response();
  }

  async findByUserId(user: User) {
    const todos = await this.todoHelper.getAllByUserId(user.id);

    return new SuccessResponse(todos).response();
  }

  async create(user: User, todoPayload: createTodoDTO) {
    // update userId in payload
    todoPayload.userId = user.id;

    // create todo
    const todo = await this.todoHelper.create(todoPayload);

    return new SuccessResponse(todo)
      .setMessage(TodoEnum.todoCreatedSuccessfully)
      .setStatusCode(HttpStatus.CREATED)
      .response();
  }

  async update(todoId: number, todoPayload: updateTodoDTO) {
    // Get todo
    const existingTodo = await this.todoHelper.getById(todoId);

    // Verify if todo exist
    if (!existingTodo) {
      throw new CustomException()
        .setMessage(TodoEnum.todoNotFound)
        .setStatusCode(HttpStatus.NOT_FOUND)
        .response();
    }

    // udpate todo
    const updatedTodo = await this.todoHelper.update(todoId, todoPayload);

    return new SuccessResponse(updatedTodo)
      .setMessage(TodoEnum.todoUpdatedSuccessfully)
      .setStatusCode(HttpStatus.CREATED)
      .response();
  }

  async delete(todoId: number) {
    // Get todo
    const existingTodo = await this.todoHelper.getById(todoId);

    // Verify if todo exist
    if (!existingTodo) {
      throw new CustomException()
        .setMessage(TodoEnum.todoNotFound)
        .setStatusCode(HttpStatus.NOT_FOUND)
        .response();
    }

    // delete todo
    await this.todoHelper.remove(todoId);

    return;
  }
}
