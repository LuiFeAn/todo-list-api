import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class RegisterUserInputDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 0,
    minSymbols: 1,
    minNumbers: 1,
  })
  password: string;
}
