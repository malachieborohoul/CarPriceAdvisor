import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //   }),
  // );
//:
//ghhghh
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(
    cookieSession({
      keys: ['bsm'],
    }),
  );

  //  app.use(cookieSession({
  // keys:['dkkdkddk']
  //  }))

  await app.listen(3000);
}
bootstrap();
