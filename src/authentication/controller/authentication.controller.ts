import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';
import { AccessUserAuthenticationDto } from '../dto/access-user-authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('access-token')
  getAccessToken(
    @Body(ValidationPipe)
    accessUserAuthenticationDto: AccessUserAuthenticationDto,
  ) {
    return this.authService.getAccessToken(accessUserAuthenticationDto);
  }
}
