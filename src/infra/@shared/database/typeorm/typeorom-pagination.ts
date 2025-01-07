import { BasePaginationInputDto } from '@infra/@shared/dto/base-pagination.dto';
import { FindManyOptions, Repository } from 'typeorm';

interface IPagination extends BasePaginationInputDto {
  limit: number;
  offset: number;
}

interface IPaginationProps<T> {
  repository: Repository<T>;
  options?: FindManyOptions<T>;
  pagination?: IPagination;
}

export async function Pagination<T>({
  repository,
  options,
  pagination = {
    limit: 20,
    offset: 0,
  },
}: IPaginationProps<T>) {
  const { limit, offset, all } = pagination;

  const totalItems = await repository.count({
    where: options?.where || {},
  });

  const totalPages = Math.ceil(totalItems / limit);
  const page = Math.max((offset - 1) * limit, 0);

  const hasPagination = !all
    ? {
        skip: page,
        take: limit,
      }
    : {};

  const items = await repository.find({
    ...options,
    ...hasPagination,
  });

  const nextPage = offset < totalPages;
  const lastPage = offset != 1;

  return {
    currentPage: offset,
    totalItemsInPage: items.length,
    nextPage,
    lastPage,
    totalItems,
    totalPages,
    items,
  };
}
