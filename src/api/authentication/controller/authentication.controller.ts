import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AccessUserService } from '../service/access-user.service';
import { AccessUserAuthenticationDto } from '../dto/access-user-authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private accessUserService: AccessUserService) {}

  @Post('access-token')
  getAccessToken(
    @Body(ValidationPipe)
    accessUserAuthenticationDto: AccessUserAuthenticationDto,
  ) {
    return this.accessUserService.getAccessToken(accessUserAuthenticationDto);
  }
}
