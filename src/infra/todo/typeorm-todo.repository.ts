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
import { Pagination } from '@infra/@shared/database/typeorm/typeorom-pagination';
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
    const entity = await this.repository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });

    if (!entity) {
      return;
    }
    return TodoListMapper.typeOrmToDomain(entity);
  }
  async findAll(
    data: Partial<TodoList>,
    pagination: IRepositoryMetaDataInput,
  ): Promise<IRepositoryMetaDataOutput<TodoList>> {
    const todos = await Pagination({
      repository: this.repository,
      options: {
        where: {
          user: {
            id: data.userId,
          },
        },
      },
      pagination: {
        offset: pagination.limit,
        limit: pagination.page,
        all: false,
      },
    });

    return {
      ...todos,
      items: todos.items.map(TodoListMapper.typeOrmToDomain),
    };
  }
  async update(id: string, data: Partial<TodoList>) {
    await this.repository.update(id, {
      title: data.title,
      description: data.description,
      priority: data.priority,
    });
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
