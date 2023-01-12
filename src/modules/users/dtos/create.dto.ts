import {
  IsDateString,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';
import { Genders, Roles } from 'src/types';

export default class CreateUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  primaryPhoneNumber: string;

  @IsString()
  @IsOptional()
  secondaryPhoneNumber?: string;

  @IsIn(Object.keys(Genders))
  gender: Genders;

  @IsIn(Object.keys(Roles))
  role: Roles;

  @IsDateString()
  birthDate: string;

  @IsString()
  password: string;
}
