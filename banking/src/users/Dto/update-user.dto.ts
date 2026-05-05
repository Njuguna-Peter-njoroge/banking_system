/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsPhoneNumber('KE')
  @IsOptional()
  phoneNumber?: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsString()
  password?: string;
}
