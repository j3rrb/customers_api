import { ApiProperty } from '@nestjs/swagger';
import { Genders, Roles } from 'src/types';

export default class UserModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  primaryPhoneNumber: string;

  @ApiProperty({
    nullable: true,
    type: String,
  })
  secondaryPhoneNumber: string | null;

  @ApiProperty()
  gender: Genders;

  @ApiProperty()
  role: Roles;

  @ApiProperty()
  birthDate: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
