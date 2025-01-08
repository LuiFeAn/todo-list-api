import { PriorityEnum } from '@domain/todo/priority.enum';
import { BasePaginationInputDto } from '@infra/@shared/dto/base-pagination.dto';
import { transformStringBooleanToBoolean } from '@infra/@shared/utils/transform-boolean-string';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class ListTodoInputDto extends BasePaginationInputDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsBoolean()
  @Transform(transformStringBooleanToBoolean)
  done: boolean;

  @IsOptional()
  @IsEnum(PriorityEnum)
  priority: PriorityEnum;
}
