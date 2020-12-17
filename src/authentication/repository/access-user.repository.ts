import { EntityRepository, Repository } from 'typeorm';
import { AccessUserEntity } from '../entity/access-user.entity';

@EntityRepository(AccessUserEntity)
export class AccessUserRepository extends Repository<AccessUserEntity> {}
