import { PriorityEnum } from '@domain/todo/priority.enum';
import { BasePaginationInputDto } from '@infra/@shared/dto/base-pagination.dto';
import { IsEnum, IsOptional } from 'class-validator';

export class ListTodoInputDto extends BasePaginationInputDto {
  @IsOptional()
  @IsEnum(PriorityEnum)
  priority: PriorityEnum;
}
