import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../../authentication/decorator/roles.decorator';
import { RolesEnum } from '../../authentication/enum/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../authentication/guard/roles.guard';
import {
  DNSHealthIndicator,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { AccessUserHealthIndicator } from '../../authentication/health/access-user.health';

@Controller('health')
@UseGuards(AuthGuard(), RolesGuard)
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dns: DNSHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private mem: MemoryHealthIndicator,
    private accessUser: AccessUserHealthIndicator,
  ) {}

  @Get()
  @Roles(RolesEnum.ROOT, RolesEnum.ADMIN)
  check() {
    return this.health.check([
      () => this.dns.pingCheck('google', 'https://google.com'),
      () => this.dns.pingCheck('google-au', 'https://google.com.au'),
      () => this.mem.checkHeap('memory-heap', 100 * 1024 * 1024),
      () => this.accessUser.userWithRole('root-user', RolesEnum.ROOT),
      () => this.accessUser.userWithRole('admin-users', RolesEnum.ADMIN, false),
    ]);
  }
}
