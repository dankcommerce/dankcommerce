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
import { RolesGuard } from '../guard/roles.guard';
import { RolesEnum } from '../enum/roles.enum';
import { Roles } from '../decorator/roles.decorator';

@Controller('access-user')
@UseGuards(AuthGuard(), RolesGuard)
export class AccessUserController {
  constructor(private accessUserService: AccessUserService) {}

  @Post('create')
  @Roles(RolesEnum.ROOT)
  create(
    @Body(ValidationPipe)
    accessUserCreationDto: AccessUserCreationDto,
  ) {
    return this.accessUserService.createAccessUser(accessUserCreationDto);
  }
}
