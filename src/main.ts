import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './config/types/config.types';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<Config, true>);
  const { port, host } = configService.get('app', { infer: true });

  app.use(cors());
  app.use(cookieParser());

  await app.listen(port, host, () =>
    console.log(`Server is listening on ${host}:${port}`),
  );
}

bootstrap();
