import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../../../api/authentication/decorator/roles.decorator';
import { RolesEnum } from '../../../api/authentication/enum/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../../api/authentication/guard/roles.guard';
import {
  DNSHealthIndicator,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { AccessUserHealthIndicator } from '../../../api/authentication/health/access-user.health';
import { HealthLogService } from '../service/health-log.service';

@Controller('health')
@UseGuards(AuthGuard(), RolesGuard)
export class HealthController {
  constructor(
    private healthLogService: HealthLogService,
    private health: HealthCheckService,
    private dns: DNSHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private mem: MemoryHealthIndicator,
    private accessUser: AccessUserHealthIndicator,
  ) {}

  @Get()
  @Roles(RolesEnum.ROOT, RolesEnum.ADMIN)
  async check() {
    try {
      const results = await this.healthCheck();
      this.healthLogService.log(results);
      return results;
    } catch (err) {
      this.healthLogService.log(err.response);
      throw err;
    }
  }

  async healthCheck() {
    return await this.health.check([
      () => this.dns.pingCheck('google', 'https://google.com'),
      () => this.dns.pingCheck('google-au', 'https://google.com.au'),
      () => this.mem.checkHeap('memory-heap', 100 * 1024 * 1024),
      () => this.accessUser.userWithRole('root-user', RolesEnum.ROOT),
      () => this.accessUser.userWithRole('admin-users', RolesEnum.ADMIN, false),
    ]);
  }
}
