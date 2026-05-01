/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateClassdto {
  @IsOptional()
  @IsString()
  FullName?: string;

  @IsPhoneNumber('KE')
  @IsOptional()
  @IsString()
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
