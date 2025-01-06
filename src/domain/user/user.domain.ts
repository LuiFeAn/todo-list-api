import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  validateSync,
} from 'class-validator';
import { BaseEntity } from '../@shared/base.entity';
import { IUserConstructorProps } from './user.interface';
import { hash, compare } from 'bcrypt';

export class User extends BaseEntity {
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

  constructor({ id, createdAt, email, name, password }: IUserConstructorProps) {
    super({
      id,
      createdAt,
    });
    this._email = email;
    this._username = name;
    this._password = password;
    this.validate();
  }

  validate() {
    const errors = validateSync(this);
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
}
