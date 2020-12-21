import {
  IsIn,
  IsLowercase,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from '../enum/roles.enum';

export class AccessUserCreationDto {
  @ApiProperty({
    default: 'newuser01',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsLowercase()
  username: string;

  @ApiProperty({
    default: 'SomeDankerPassword1!',
  })
  @IsString()
  @MinLength(12)
  @MaxLength(64)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain one or more lower case character, one or more upper case characters and one or more numbers or special character',
  })
  password: string;

  @ApiProperty({
    default: RolesEnum.ADMIN,
  })
  @IsIn(Object.values(RolesEnum))
  role: string;
}
