import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [UsersModule]
})
export class AppModule {}
