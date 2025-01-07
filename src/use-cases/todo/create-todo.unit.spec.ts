import { CreateTodoUseCase } from './create-todo.use-case';
import { TodoGateway } from '@domain/todo/todo.repository.gateway';
import { TodoListFactory } from '@domain/todo/todo.factory';
import { TodoListMapper } from '@domain/todo/todo.mapper';
import { PriorityEnum } from '@domain/todo/priority.enum';
import { CreateTodoInputDto } from './create-todo.dto';
import { entityValidator } from '@utils/entityValdiator';

jest.mock('@utils/entityValdiator', () => ({
  entityValidator: jest.fn(),
}));

describe('CreateTodoUseCase', () => {
  let todoRepo: jest.Mocked<TodoGateway>;
  let useCase: CreateTodoUseCase;

  beforeEach(() => {
    todoRepo = {
      create: jest.fn(),
    } as unknown as jest.Mocked<TodoGateway>;

    useCase = new CreateTodoUseCase(todoRepo);
  });

  it('should create a todo successfully with valid input', async () => {
    const input = new CreateTodoInputDto('New Task', 'Test', PriorityEnum.High);

    const mockTodo = TodoListFactory.create({
      userId: '123',
      title: input.title,
      description: input.description,
      priority: input.priority,
    });

    jest.spyOn(TodoListFactory, 'create').mockReturnValue(mockTodo);
    todoRepo.create.mockResolvedValue();

    const result = await useCase.execute({
      userId: '123',
      title: input.title,
      description: input.description,
      priority: input.priority,
    });

    expect(entityValidator).toHaveBeenCalledWith(input);
    expect(TodoListFactory.create).toHaveBeenCalledWith({
      userId: '123',
      title: input.title,
      description: input.description,
      priority: input.priority,
    });
    expect(todoRepo.create).toHaveBeenCalledWith(mockTodo);
    expect(result).toEqual(TodoListMapper.toObjectLiterals(mockTodo));
  });

  it('should handle missing priority and validate successfully', async () => {
    const input = new CreateTodoInputDto('New Task', 'Test');

    const mockTodo = TodoListFactory.create({
      userId: '123',
      title: input.title,
      description: input.description,
      priority: undefined,
    });

    jest.spyOn(TodoListFactory, 'create').mockReturnValue(mockTodo);
    todoRepo.create.mockResolvedValue();

    const result = await useCase.execute({
      userId: '123',
      title: input.title,
      description: input.description,
      priority: undefined,
    });

    expect(entityValidator).toHaveBeenCalledWith(input);
    expect(TodoListFactory.create).toHaveBeenCalledWith({
      userId: '123',
      title: input.title,
      description: input.description,
      priority: undefined,
    });
    expect(todoRepo.create).toHaveBeenCalledWith(mockTodo);
    expect(result).toEqual(TodoListMapper.toObjectLiterals(mockTodo));
  });

  it('should throw an error if the repository fails to create the todo', async () => {
    const input = new CreateTodoInputDto('New Task', 'Test', PriorityEnum.Low);

    const mockTodo = TodoListFactory.create({
      userId: '123',
      title: input.title,
      description: input.description,
      priority: input.priority,
    });

    jest.spyOn(TodoListFactory, 'create').mockReturnValue(mockTodo);
    todoRepo.create.mockRejectedValue(new Error('Repository error'));

    await expect(
      useCase.execute({
        userId: '123',
        title: input.title,
        description: input.description,
        priority: input.priority,
      }),
    ).rejects.toThrow('Repository error');

    expect(entityValidator).toHaveBeenCalledWith(input);
    expect(TodoListFactory.create).toHaveBeenCalledWith({
      userId: '123',
      title: input.title,
      description: input.description,
      priority: input.priority,
    });
    expect(todoRepo.create).toHaveBeenCalledWith(mockTodo);
  });
});
