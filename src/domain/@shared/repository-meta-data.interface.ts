export interface IRepositoryMetaDataInput {
  page: number;
  limit: number;
}

export interface IRepositoryMetaDataOutput<E> {
  page: number;
  limit: number;
  totalResources: number;
  currentPage: number;
  resources: E[];
}
