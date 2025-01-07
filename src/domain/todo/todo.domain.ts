import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { PriorityEnum } from './priority.enum';
import { ITodo } from './todo.interface';
import { entityValidator } from '@utils/entityValdiator';

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
  @IsOptional()
  private _done: boolean = false;

  @IsOptional()
  @IsEnum(PriorityEnum)
  private _priority: PriorityEnum = PriorityEnum.Low;

  @IsNotEmpty()
  @IsISO8601()
  private _createdAt: string;

  constructor({ id, createdAt, description, title }: ITodo) {
    this._id = id;
    this._description = description;
    this._title = title;
    this._createdAt = createdAt;
    this.validate();
  }

  validate() {
    entityValidator(this);
  }

  makeDone() {
    if (!this._done) {
      this._done = true;
    }
  }

  makeNotDone() {
    if (this._done) {
      this._done = false;
    }
  }

  changePriority(priority: PriorityEnum) {
    this._priority = priority;
  }

  get id() {
    return this._id;
  }

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
