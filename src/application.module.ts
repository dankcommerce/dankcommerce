import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { UtilityModule } from './utility/utility.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [CoreModule, UtilityModule, ApiModule],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
