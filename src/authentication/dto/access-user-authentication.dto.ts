import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccessUserAuthenticationDto {
  @ApiProperty({
    default: 'root',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    default: 'SomeDankPassword1!',
  })
  @IsString()
  @MinLength(12)
  @MaxLength(64)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain one or more lower case character, one or more upper case characters and one or more numbers or special character',
  })
  password: string;
}
