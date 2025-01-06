import { IBaseEntityConstructorProps } from './base.entity.interface';

export class BaseEntity {
  protected _id: string;
  private _createdAt: string;
  private _updatedAt: string;

  constructor({ id, createdAt }: IBaseEntityConstructorProps) {
    this._id = id;
    this._createdAt = createdAt;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}
