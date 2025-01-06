import { IBaseRepository } from '@domain/@shared/base-repository.interface';
import { User } from './user.domain';

export abstract class UserGateway
  implements Omit<IBaseRepository<User>, 'findAll' | 'update' | 'delete'>
{
  abstract create(entity: User): Promise<void>;
  abstract findById(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<boolean>;
}
