import { BaseEntity } from '../@shared/base.entity';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { PriorityEnum } from './priority.enum';

export class TodoList extends BaseEntity {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  private _title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(800)
  private _description: string;

  @IsBoolean()
  @IsNotEmpty()
  private _done: boolean;

  @IsNotEmpty()
  @IsEnum(PriorityEnum)
  private _priority: PriorityEnum;

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get done() {
    return this._done;
  }

  get priority() {
    return this._priority;
  }
}
