import { PriorityEnum } from './priority.enum';

export interface ITodo {
  id: string;
  title: string;
  priority?: PriorityEnum;
  description: string;
  createdAt: string;
}
