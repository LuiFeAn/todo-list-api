import { DeleteTodoUseCase } from './delete-todo.use-case';
import { TodoGateway } from '@domain/todo/todo.repository.gateway';
import { NotFoundDomainError } from '@domain/errors/not-found/not-found.errors';
import { TodoListFactory } from '@domain/todo/todo.factory';
import { randomUUID } from 'crypto';

describe('DeleteTodoUseCase', () => {
  let todoRepo: jest.Mocked<TodoGateway>;
  let useCase: DeleteTodoUseCase;

  beforeEach(() => {
    todoRepo = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<TodoGateway>;

    useCase = new DeleteTodoUseCase(todoRepo);
  });

  it('should delete a todo successfully if it exists', async () => {
    const todoId = 'valid-id';

    todoRepo.findById.mockResolvedValue(
      TodoListFactory.create({
        userId: randomUUID(),
        description: 'aaaa',
        title: 'sdsdsd',
      }),
    );

    await useCase.execute(todoId);

    expect(todoRepo.findById).toHaveBeenCalledWith(todoId);
    expect(todoRepo.delete).toHaveBeenCalledWith(todoId);
  });

  it('should throw NotFoundDomainError if todo does not exist', async () => {
    const todoId = 'nonexistent-id';

    todoRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute(todoId)).rejects.toThrow(
      new NotFoundDomainError('Todo não encontrado'),
    );

    expect(todoRepo.findById).toHaveBeenCalledWith(todoId);
    expect(todoRepo.delete).not.toHaveBeenCalled();
  });
});
