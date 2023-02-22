import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';

import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333);
}

bootstrap().then(() => {
  Logger.debug('Server started on port 3333');
});
