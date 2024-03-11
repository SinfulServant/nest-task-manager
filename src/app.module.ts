import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TaskModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
