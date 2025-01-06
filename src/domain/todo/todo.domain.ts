import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { PriorityEnum } from './priority.enum';

export class TodoList {
  @IsNotEmpty()
  @IsUUID()
  protected _id: string;

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

  @IsNotEmpty()
  @IsISO8601()
  private _createdAt: string;

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

  get createdAt() {
    return this._createdAt;
  }
}
