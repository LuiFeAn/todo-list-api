import { IUser } from './user.interface';

export interface ICreateUserFactoryProps
  extends Omit<IUser, 'id' | 'createdAt'> {
  id?: string;
  createdAt?: string;
}
