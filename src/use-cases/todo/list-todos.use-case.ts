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
  search?: string;
  done?: boolean;
  priority?: PriorityEnum;
}

export class ListTodoUseCase
  implements IBaseUseCase<IListTodoInputDto, IRepositoryMetaDataOutput<ITodo>>
{
  constructor(private readonly todoGateway: TodoGateway) {}

  async execute({
    userId,
    priority,
    search,
    limit,
    page,
    done,
  }: IListTodoInputDto): Promise<IRepositoryMetaDataOutput<ITodo>> {
    const todos = await this.todoGateway.findAll(
      {
        userId,
        priority,
        description: search,
        title: search,
        done,
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
