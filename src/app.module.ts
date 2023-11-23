import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type:"sqlite",
      database: "db",
      entities:[User]
    })
  ]
})
export class AppModule {}
