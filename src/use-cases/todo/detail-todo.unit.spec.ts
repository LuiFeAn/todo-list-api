import { DetailTodoUseCase } from './detail-todo.use-case';
import { TodoGateway } from '@domain/todo/todo.repository.gateway';
import { NotFoundDomainError } from '@domain/errors/not-found/not-found.errors';
import { TodoList } from '@domain/todo/todo.domain';
import { PriorityEnum } from '@domain/todo/priority.enum';
import { TodoListFactory } from '@domain/todo/todo.factory';
import { randomUUID } from 'crypto';

describe('DetailTodoUseCase', () => {
  let detailTodoUseCase: DetailTodoUseCase;
  let todoGatewayMock: jest.Mocked<TodoGateway>;

  beforeEach(() => {
    todoGatewayMock = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<TodoGateway>;

    detailTodoUseCase = new DetailTodoUseCase(todoGatewayMock);
  });

  it('should return the todo as a literal object when found', async () => {
    const todoId = randomUUID();

    const todoMock = TodoListFactory.create({
      id: todoId,
      userId: randomUUID(),
      title: 'Test Todo',
      description: 'A test description',
    });

    todoGatewayMock.findById.mockResolvedValueOnce(todoMock);

    const result = await detailTodoUseCase.execute(todoId);

    expect(result).toEqual({
      id: todoMock.id,
      userId: todoMock.userId,
      title: todoMock.title,
      description: todoMock.description,
      createdAt: todoMock.createdAt,
      done: todoMock.done,
    });
    expect(todoGatewayMock.findById).toHaveBeenCalledWith(todoId);
  });

  it('should throw NotFoundDomainError if todo is not found', async () => {
    todoGatewayMock.findById.mockResolvedValueOnce(null);

    await expect(detailTodoUseCase.execute('1')).rejects.toThrow(
      NotFoundDomainError,
    );
    expect(todoGatewayMock.findById).toHaveBeenCalledWith('1');
  });
});
