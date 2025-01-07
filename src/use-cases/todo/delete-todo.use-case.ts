import { IBaseUseCase } from '@shared/base-use-case.interface';
import { TodoGateway } from '@domain/todo/todo.repository.gateway';

export class DeleteTodoUseCase implements IBaseUseCase<string, void> {
  constructor(private readonly todoGateway: TodoGateway) {}

  async execute(id: string): Promise<void> {
    await this.todoGateway.delete(id);
  }
}
