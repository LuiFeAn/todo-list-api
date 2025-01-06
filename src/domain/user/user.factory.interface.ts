import { IUserConstructorProps } from './user.interface';

export interface ICreateUserFactoryProps
  extends Omit<IUserConstructorProps, 'id' | 'createdAt'> {}
