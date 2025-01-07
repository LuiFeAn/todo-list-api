import { ITodo } from './todo.interface';

export interface ICreateTodoFactoryInput
  extends Omit<ITodo, 'id' | 'createdAt'> {
  id?: string;
  createdAt?: string;
}
