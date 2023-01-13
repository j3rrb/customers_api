import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';
import { Genders, Roles } from 'src/types';

export default class CreateUserDTO {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  primaryPhoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  secondaryPhoneNumber?: string;

  @ApiProperty({ enum: Object.values(Genders) })
  @IsIn(Object.keys(Genders))
  gender: Genders;

  @ApiProperty({ enum: Object.values(Roles) })
  @IsIn(Object.keys(Roles))
  role: Roles;

  @ApiProperty()
  @IsDateString()
  birthDate: string;

  @ApiProperty()
  @IsString()
  password: string;
}
