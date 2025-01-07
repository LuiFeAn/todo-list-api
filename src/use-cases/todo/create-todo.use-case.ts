import { IBaseUseCase } from '@shared/base-use-case.interface';
import { TodoGateway } from '@domain/todo/todo.repository.gateway';
import { ITodo } from '@domain/todo/todo.interface';
import { TodoListFactory } from '@domain/todo/todo.factory';
import { TodoListMapper } from '@domain/todo/todo.mapper';
import { PriorityEnum } from '@domain/todo/priority.enum';

export interface ICreateTodoInputDto {
  userId: string;
  title: string;
  description: string;
  priority?: PriorityEnum;
}

export class CreateTodoUseCase
  implements IBaseUseCase<ICreateTodoInputDto, ITodo>
{
  constructor(private readonly todoGateway: TodoGateway) {}

  async execute({
    userId,
    title,
    description,
    priority,
  }: ICreateTodoInputDto): Promise<ITodo> {
    const todo = TodoListFactory.create({
      userId,
      title,
      description,
      priority,
    });

    await this.todoGateway.create(todo);

    return TodoListMapper.toObjectLiterals(todo);
  }
}
