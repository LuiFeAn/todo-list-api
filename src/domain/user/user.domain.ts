import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { BaseEntity } from '../@shared/base.entity';

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
