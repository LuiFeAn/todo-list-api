import { IBaseUseCase } from '@shared/base-use-case.interface';
import { TodoGateway } from '@domain/todo/todo.repository.gateway';
import { NotFoundDomainError } from '@domain/errors/not-found/not-found.errors';
import { ITodo } from '@domain/todo/todo.interface';
import { TodoListMapper } from '@domain/todo/todo.mapper';

export class DetailTodoUseCase implements IBaseUseCase<string, ITodo> {
  constructor(private readonly todoGateway: TodoGateway) {}

  async execute(id: string): Promise<ITodo> {
    const todo = await this.todoGateway.findById(id);

    if (!todo) {
      throw new NotFoundDomainError('Todo não encontrado');
    }

    return TodoListMapper.toObjectLiterals(todo);
  }
}
