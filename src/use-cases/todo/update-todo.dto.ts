import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoInputDto } from './create-todo.dto';

export class UpdateTodoInputDto extends PartialType(CreateTodoInputDto) {}
