import { EntityErrors } from '@domain/errors/entity-validation/entity-errors.error';
import { IUser } from '@domain/user/user.interface';
import classValidatorValidation from '@utils/classValidatorValidation';
import { IsEmail, IsNotEmpty, IsString, validateSync } from 'class-validator';

export class UserAuthenticationInputDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  validate() {
    const validation = classValidatorValidation(validateSync(this));

    if (validation.errors.length > 0) {
      throw new EntityErrors({
        context: 'UserAuthenticationInput',
        ...validation,
      });
    }
  }
}

export class UserAuthenticationOutputDto {
  user: IUser;
  accessToken: string;
}
