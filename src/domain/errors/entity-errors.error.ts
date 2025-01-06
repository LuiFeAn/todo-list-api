export class EntityErrors extends Error {
  private _errors: string[];
  constructor(context: string, errors: string[]) {
    super(context);
    this._errors = errors;
  }
}
