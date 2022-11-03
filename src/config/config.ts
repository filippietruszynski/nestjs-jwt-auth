import { ConfigObject } from '@nestjs/config';

export function config(): ConfigObject {
  const processEnv: NodeJS.ProcessEnv = process.env;

  return {
    app: {
      host: processEnv.APP_HOST,
      port: processEnv.APP_PORT && parseInt(processEnv.APP_PORT, 10),
    },
    db: {
      name: processEnv.DB_NAME,
      host: processEnv.DB_HOST,
      port: processEnv.DB_PORT && parseInt(processEnv.DB_PORT, 10),
      username: processEnv.DB_USERNAME,
      password: processEnv.DB_PASSWORD,
      synchronize: processEnv.DB_SYNCHRONIZE === 'true',
    },
    jwt: {
      secret: processEnv.JWT_SECRET,
      expirationTime:
        processEnv.JWT_EXPIRATION_TIME &&
        parseInt(processEnv.JWT_EXPIRATION_TIME, 10),
    },
  };
}
