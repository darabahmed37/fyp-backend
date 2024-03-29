import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';

import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.listen(8000);
}

bootstrap().then(() => {
  Logger.log('Server started on port 8000');
});
