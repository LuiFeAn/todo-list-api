import { IBaseUseCase } from '@shared/base-use-case.interface';
import { TodoGateway } from '@domain/todo/todo.repository.gateway';
import { NotFoundDomainError } from '@domain/errors/not-found/not-found.errors';

export class DeleteTodoUseCase implements IBaseUseCase<string, void> {
  constructor(private readonly todoGateway: TodoGateway) {}

  async execute(id: string): Promise<void> {
    const todo = await this.todoGateway.findById(id);

    if (!todo) {
      throw new NotFoundDomainError('Todo não encontrado');
    }

    await this.todoGateway.delete(id);
  }
}
