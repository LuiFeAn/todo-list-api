import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  validateSync,
} from 'class-validator';
import { PriorityEnum } from './priority.enum';
import { ITodoConstructorProps } from './todo.interface';
import classValidatorValidation from '@utils/classValidatorValidation';
import { EntityErrors } from '@domain/errors/entity-validation/entity-errors.error';

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

  constructor({ id, createdAt, description, title }: ITodoConstructorProps) {
    this._id = id;
    this._description = description;
    this._title = title;
    this._createdAt = createdAt;
    this.validate();
  }

  validate() {
    const validation = classValidatorValidation(validateSync(this));

    if (validation.errors.length > 0) {
      throw new EntityErrors({
        context: 'TodoDomain',
        ...validation,
      });
    }
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
