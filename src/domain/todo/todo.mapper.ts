import { TodoList } from './todo.domain';

export class TodoListMapper {
  public static toOuput(todoList: TodoList) {
    return {
      id: todoList.id,
      title: todoList.title,
      description: todoList.description,
      done: todoList.done,
      createdAt: todoList.createdAt,
    };
  }
}
