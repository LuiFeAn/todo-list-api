import { TodoGateway } from '@domain/todo/todo.repository.gateway';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoListModel } from './todo.model';
import { Repository } from 'typeorm';
import { TodoList } from '@domain/todo/todo.domain';
import { TodoListMapper } from '@domain/todo/todo.mapper';
import {
  IRepositoryMetaDataInput,
  IRepositoryMetaDataOutput,
} from '@domain/@shared/repository-meta-data.interface';

export class TypeOrmTodoRepository implements TodoGateway {
  constructor(
    @InjectRepository(TodoListModel)
    private readonly repository: Repository<TodoListModel>,
  ) {}
  async create(entity: TodoList): Promise<void> {
    await this.repository.save({
      user: {
        id: entity.userId,
      },
      ...TodoListMapper.domainToTypeOrm(entity),
    });
  }
  async findById(id: string): Promise<TodoList> {
    const entity = await this.repository.findOneBy({
      id,
    });
    if (!entity) {
      return;
    }
    return TodoListMapper.typeOrmToDomain(entity);
  }
  findAll(
    data: Partial<TodoList>,
    pagination: IRepositoryMetaDataInput,
  ): Promise<IRepositoryMetaDataOutput<TodoList>> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Partial<TodoList>) {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
