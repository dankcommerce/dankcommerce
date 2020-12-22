import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { QueueOptions } from 'bull';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configurationService: ConfigService) =>
        configurationService.get<QueueOptions>('redis'),
      inject: [ConfigService],
    }),
  ],
})
export class RedisModule {}
