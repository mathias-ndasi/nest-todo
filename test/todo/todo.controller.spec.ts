import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from '../../src/controller/todo.controller';
import { TodoHelper } from '../../src/helper/todo.helper';
import { PrismaService } from '../../src/service/prisma.service';
import { TodoService } from '../../src/service/todo.service';

describe('TodoController', () => {
  let controller: TodoController;
  let todoService: TodoService;
  let todoHelper: TodoHelper;

  const prismaServiceMock = {
    onModuleInit: () => true,
    onModuleDestroy: () => true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [PrismaService, TodoHelper, TodoService],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
    todoHelper = module.get<TodoHelper>(TodoHelper);
  });

  it('Check if controller is defined', async () => {
    expect(controller).toBeDefined();
  });

  describe('Get all todos', () => {
    it('Get all todos', async () => {
      const todos = await controller.getAll();
      jest
        .spyOn(todoService, 'findAll')
        .mockImplementation(() => Promise.resolve([]));

      expect(Array.isArray(todos)).toBe(true);
    });
  });
});
