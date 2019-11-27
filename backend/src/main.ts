import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { mode, Mode, cookieSigningSecret } from './environment';

async function bootstrap() {
  const modeName = mode === Mode.Production
    ? 'production'
    : 'development';
  console.log(`App started in ${modeName} mode`);

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser(cookieSigningSecret));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
