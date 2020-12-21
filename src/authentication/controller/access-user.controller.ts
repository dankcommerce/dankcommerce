import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AccessUserService } from '../service/access-user.service';
import { AccessUserCreationDto } from '../dto/access-user-creation.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('access-user')
@UseGuards(AuthGuard())
export class AccessUserController {
  constructor(private accessUserService: AccessUserService) {}

  @Post('create')
  create(
    @Body(ValidationPipe)
    accessUserCreationDto: AccessUserCreationDto,
  ) {
    return this.accessUserService.createAccessUser(accessUserCreationDto);
  }
}
