import { Module } from '@nestjs/common';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication/authentication.module';
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    LoggingModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
