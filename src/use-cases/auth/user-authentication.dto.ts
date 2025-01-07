import { IUser } from '@domain/user/user.interface';
import { entityValidator } from '@utils/entityValdiator';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserAuthenticationInputDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(email: string, password: string) {
    if (email && password) {
      this.email = email;
      this.password = password;
      this.validate();
    }
  }

  validate() {
    entityValidator(this);
  }
}

export class UserAuthenticationOutputDto {
  user: IUser;
  accessToken: string;
}
