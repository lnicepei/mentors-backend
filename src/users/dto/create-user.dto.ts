// used to set types for internal usage

import { IsEmail, IsStrongPassword, MinLength } from 'class-validator';

// and entity fields validation
export class CreateUserDto {
  @MinLength(5, { message: 'Please enter' })
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
