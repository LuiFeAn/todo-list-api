import { IEntityErrorsConstructorProps } from './entity-errors.interface';

export class EntityErrors extends Error {
  public _context: string;
  public _errors: string[];
  constructor({ context, errors, unionErrors }: IEntityErrorsConstructorProps) {
    super(unionErrors);
    this._context = context;
    this._errors = errors;
  }
}
