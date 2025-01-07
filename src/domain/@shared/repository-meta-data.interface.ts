export interface IRepositoryMetaDataInput {
  page: number;
  limit: number;
}

export interface IRepositoryMetaDataOutput<E> {
  currentPage: number;
  totalItemsInPage: number;
  nextPage: boolean;
  lastPage: boolean;
  totalItems: number;
  totalPages: number;
  items: E[];
}
