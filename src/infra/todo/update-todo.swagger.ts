import { PartialType } from '@nestjs/swagger';
import { CreateTodoHttpInput } from './create-todo.swagger';

export class UpdateTodoHttpInput extends PartialType(CreateTodoHttpInput) {}
