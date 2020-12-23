import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';
import { AccessUserService } from '../service/access-user.service';
import { RolesEnum } from '../enum/roles.enum';

@Injectable()
export class AccessUserHealthIndicator extends HealthIndicator {
  constructor(private accessUserService: AccessUserService) {
    super();
  }

  async userWithRole(
    key: string,
    role: RolesEnum,
    throwError = true,
  ): Promise<HealthIndicatorResult> {
    const count = await this.accessUserService.countByRole(role);
    const isHealthy = count > 0;
    const result = this.getStatus(key, isHealthy, { count });

    if (!isHealthy && throwError) {
      throw new HealthCheckError('Missing user with role', result);
    }

    return result;
  }
}
