import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { IUser } from './user.interface';
import { hash, compare } from 'bcrypt';
import { entityValidator } from '@utils/entityValdiator';
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
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 0,
    minSymbols: 1,
    minNumbers: 1,
  })
  private _password: string;

  @IsEmail()
  @IsNotEmpty()
  private _email: string;

  @IsNotEmpty()
  @IsISO8601()
  private _createdAt: string;

  constructor({ id, createdAt, email, username, password }: IUser) {
    this._id = id;
    this._email = email;
    this._username = username;
    this._password = password;
    this._createdAt = createdAt;
    this.validate();
  }

  validate() {
    entityValidator(this);
  }

  async hashPassword(salt = 9) {
    this._password = await hash(this._password, salt);
  }

  async comparePassword(password: string) {
    return compare(password, this._password);
  }

  get id() {
    return this._id;
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
