import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  validateSync,
} from 'class-validator';
import { IUserConstructorProps } from './user.interface';
import { hash, compare } from 'bcrypt';
import mapClassValidatorErrors from '@utils/mapClassValidation';
import { EntityErrors } from '@domain/errors/entity-errors.error';
export class User {
  @IsNotEmpty()
  @IsUUID()
  protected _id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  private _username: string;

  @IsString()
  @IsNotEmpty()
  private _password: string;

  @IsEmail()
  @IsNotEmpty()
  private _email: string;

  @IsNotEmpty()
  @IsISO8601()
  private _createdAt: string;

  constructor({ id, createdAt, email, name, password }: IUserConstructorProps) {
    this._id = id;
    this._email = email;
    this._username = name;
    this._password = password;
    this._createdAt = createdAt;
    this.validate();
  }

  validate() {
    const errors = validateSync(this);

    if (errors.length > 0) {
      throw new EntityErrors('UserDomain', errors.map(mapClassValidatorErrors));
    }
  }

  async hashPassword(salt = 9) {
    this._password = await hash(this._password, salt);
  }

  async comparePassword(password: string) {
    return compare(password, this._password);
  }

  get username() {
    return this._username;
  }

  get password() {
    return this._password;
  }

  get email() {
    return this._email;
  }

  get createdAt() {
    return this._createdAt;
  }
}
