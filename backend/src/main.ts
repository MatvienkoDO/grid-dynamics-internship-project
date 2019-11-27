import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { mode, Mode } from './environment';

async function bootstrap() {
  const modeName = mode === Mode.Production
    ? 'production'
    : 'development';
  console.log(`App started in ${modeName} mode`);

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
