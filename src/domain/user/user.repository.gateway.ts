import { IBaseRepository } from '@domain/@shared/base-repository.interface';
import { User } from './user.domain';

export interface IUserGateway
  extends Omit<IBaseRepository<User>, 'findAll' | 'update' | 'delete'> {}

export abstract class UserGateway implements IUserGateway {
  abstract create(entity: User): Promise<void>;
  abstract findById(id: string): Promise<User>;
  abstract findByEmailEntity(email: string): Promise<User | null | undefined>;
  abstract findByEmail(email: string): Promise<boolean>;
}
