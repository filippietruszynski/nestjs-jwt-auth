import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './config/config.constants';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<Config, true>);
  const { port, host } = configService.get('app', { infer: true });

  await app.listen(port, host, () =>
    console.log(`Server is listening on ${host}:${port}`),
  );
}

bootstrap();
