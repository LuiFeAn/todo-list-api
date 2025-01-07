import { IBaseRepository } from '@domain/@shared/base-repository.interface';
import { TodoList } from './todo.domain';
import {
  IRepositoryMetaDataInput,
  IRepositoryMetaDataOutput,
} from '@domain/@shared/repository-meta-data.interface';

export abstract class TodoGateway implements IBaseRepository<TodoList> {
  abstract create(entity: TodoList): Promise<void>;
  abstract findById(id: string): Promise<TodoList>;
  abstract findAll(
    data: Partial<TodoList>,
    pagination: IRepositoryMetaDataInput,
  ): Promise<IRepositoryMetaDataOutput<TodoList>>;
  abstract update(id: string, data: Partial<TodoList>);
  abstract delete(id: string): Promise<void>;
}
