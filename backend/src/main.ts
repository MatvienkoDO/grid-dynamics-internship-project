import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { mode, Mode, cookieSigningSecret, corsAllowedWebOrigin } from './environment';
import { userIdExpirationUpdater } from './modules/authentication/middlewares/user-id-expiration-updater';

async function bootstrap() {
  const modeName = mode === Mode.Production
    ? 'production'
    : 'development';
  console.log(`App started in ${modeName} mode`);

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [corsAllowedWebOrigin],
    credentials: true,
  });
  app.use(cookieParser(cookieSigningSecret));
  app.use(userIdExpirationUpdater);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
