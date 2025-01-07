import { IBaseUseCase } from '@shared/base-use-case.interface';
import { TodoGateway } from '@domain/todo/todo.repository.gateway';
import { PriorityEnum } from '@domain/todo/priority.enum';
import {
  IRepositoryMetaDataInput,
  IRepositoryMetaDataOutput,
} from '@domain/@shared/repository-meta-data.interface';
import { TodoListMapper } from '@domain/todo/todo.mapper';
import { ITodo } from '@domain/todo/todo.interface';

export interface IListTodoInputDto extends IRepositoryMetaDataInput {
  userId: string;
  priority?: PriorityEnum;
}

export class ListTodoUseCase
  implements IBaseUseCase<IListTodoInputDto, IRepositoryMetaDataOutput<ITodo>>
{
  constructor(private readonly todoGateway: TodoGateway) {}

  async execute({
    userId,
    priority,
    limit,
    page,
  }: IListTodoInputDto): Promise<IRepositoryMetaDataOutput<ITodo>> {
    const todos = await this.todoGateway.findAll(
      {
        userId,
        priority,
      },
      {
        limit,
        page,
      },
    );
    return {
      ...todos,
      items: todos.items.map(TodoListMapper.toObjectLiterals),
    };
  }
}
