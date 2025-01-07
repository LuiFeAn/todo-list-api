import { TodoListModel } from '@infra/todo/todo.model';
import { TodoList } from './todo.domain';
import { TodoListFactory } from './todo.factory';

export class TodoListMapper {
  public static domainToTypeOrm(todoList: TodoList) {
    return this.toObjectLiterals(todoList);
  }

  public static typeOrmToDomain(todoList: TodoListModel) {
    return TodoListFactory.create({
      id: todoList.id,
      userId: todoList.user.id,
      title: todoList.title,
      description: todoList.description,
      createdAt: todoList.createdAt.toISOString(),
    });
  }

  public static toObjectLiterals(todoList: TodoList) {
    return {
      id: todoList.id,
      userId: todoList.userId,
      title: todoList.title,
      description: todoList.description,
      done: todoList.done,
      createdAt: todoList.createdAt,
    };
  }
}
