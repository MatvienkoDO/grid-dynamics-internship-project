import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';

import { AppModule } from './app.module';
import { mode, Mode, cookieSigningSecret, corsAllowedWebOrigin } from './environment';
import { userIdExpirationUpdater } from './modules/authentication/middlewares/user-id-expiration-updater';

async function bootstrap() {
  const modeName = mode === Mode.Production ? 'production' : 'development';
  const developmentPort = 3000;
  const port = process.env.PORT ?? developmentPort;

  console.log(`App started in ${modeName} mode. Port: ${port}`);

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [ corsAllowedWebOrigin ],
    credentials: true,
  });
  app.use(cookieParser(cookieSigningSecret));
  app.use(userIdExpirationUpdater);
  app.use(compression());

  await app.listen(port);
}
bootstrap();
