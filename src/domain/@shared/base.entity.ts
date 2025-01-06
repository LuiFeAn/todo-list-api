export class BaseEntity {
  protected _id: string;
  private _createdAt: string;
  private _updatedAt: string;

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
