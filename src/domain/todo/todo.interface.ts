import { PriorityEnum } from './priority.enum';

export interface ITodo {
  id: string;
  userId: string;
  title: string;
  done?: boolean;
  priority?: PriorityEnum;
  description: string;
  createdAt: string;
}
