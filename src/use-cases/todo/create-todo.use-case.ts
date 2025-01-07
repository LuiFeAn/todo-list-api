import { IBaseUseCase } from '@shared/base-use-case.interface';
import { CreateTodoInputDto } from './create-todo.dto';
import { TodoGateway } from '@domain/todo/todo.repository.gateway';
import { ITodo } from '@domain/todo/todo.interface';
import { TodoListFactory } from '@domain/todo/todo.factory';
import { TodoListMapper } from '@domain/todo/todo.mapper';

export class CreateTodoUseCase
  implements IBaseUseCase<CreateTodoInputDto, ITodo>
{
  constructor(private readonly todoGateway: TodoGateway) {}

  async execute({
    title,
    description,
    priority,
  }: CreateTodoInputDto): Promise<ITodo> {
    const todo = TodoListFactory.create({
      title,
      description,
      priority,
    });

    await this.todoGateway.create(todo);

    return TodoListMapper.toObjectLiterals(todo);
  }
}
