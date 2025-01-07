import { randomUUID } from 'crypto';
import { TodoList } from './todo.domain';
import { ICreateTodoFactoryInput } from './todo.factory.interface';

export class TodoListFactory {
  public static create({
    id,
    title,
    description,
    createdAt,
  }: ICreateTodoFactoryInput) {
    return new TodoList({
      id: id ?? randomUUID(),
      title,
      description,
      createdAt: createdAt ?? new Date().toISOString(),
    });
  }
}
