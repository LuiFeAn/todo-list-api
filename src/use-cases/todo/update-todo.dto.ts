import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoInputDto } from './create-todo.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTodoInputDto extends PartialType(CreateTodoInputDto) {
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
