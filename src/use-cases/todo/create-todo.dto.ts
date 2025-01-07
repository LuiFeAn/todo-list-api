import { PriorityEnum } from '@domain/todo/priority.enum';
import { entityValidator } from '@utils/entityValdiator';
import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateTodoInputDto {
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @MaxLength(800)
  description: string;

  @IsOptional()
  @IsEnum(PriorityEnum)
  priority?: PriorityEnum;

  constructor(title: string, description: string, priority: PriorityEnum) {
    if (title && description && priority) {
      this.validate();
    }
  }

  private validate() {
    entityValidator(this);
  }
}
