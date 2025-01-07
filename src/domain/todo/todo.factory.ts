import { randomUUID } from 'crypto';
import { TodoList } from './todo.domain';
import { ICreateTodoFactoryInput } from './todo.factory.interface';
import { PriorityEnum } from './priority.enum';

export class TodoListFactory {
  public static create({
    id,
    title,
    description,
    priority,
    createdAt,
  }: ICreateTodoFactoryInput) {
    return new TodoList({
      id: id ?? randomUUID(),
      title,
      description,
      priority: priority ?? PriorityEnum.Low,
      createdAt: createdAt ?? new Date().toISOString(),
    });
  }
}
