import {
  IRepositoryMetaDataInput,
  IRepositoryMetaDataOutput,
} from './repository-meta-data.interface';

export interface IBaseRepository<E> {
  create(entity: E): Promise<void>;
  findById(id: string): Promise<E | null | undefined>;
  findAll(
    data: Partial<E>,
    pagination: IRepositoryMetaDataInput,
  ): Promise<IRepositoryMetaDataOutput<E>>;
  update(id: string, data: Partial<E>): Promise<void>;
  delete(id: string): Promise<void>;
}
