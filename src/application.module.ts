import { Module } from '@nestjs/common';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthenticationModule],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
