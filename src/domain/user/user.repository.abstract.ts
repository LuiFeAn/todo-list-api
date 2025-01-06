import { IBaseRepository } from '@domain/@shared/base-repository.interface';
import { User } from './user.domain';
import { IRepositoryMetaDataInput } from '@domain/@shared/repository-meta-data.interface';

export abstract class AbstractUserRepository implements IBaseRepository<User> {
  abstract create(entity: User): Promise<void>;
  abstract findById(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<boolean>;
  abstract findAll(data: Partial<User>, pagination: IRepositoryMetaDataInput);
  abstract update(id: string, data: Partial<User>);
  abstract delete(id: string): Promise<void>;
}
