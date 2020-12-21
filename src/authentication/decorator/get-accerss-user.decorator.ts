import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AccessUserEntity } from '../entity/access-user.entity';

export const GetAccessUser = createParamDecorator(
  (data, ctx: ExecutionContext): AccessUserEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
