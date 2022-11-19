import { Config } from './types/config.types';

export function config(): Config {
  const processEnv: NodeJS.ProcessEnv = process.env;

  return {
    app: {
      host: <string>processEnv.APP_HOST,
      port: parseInt(<string>processEnv.APP_PORT, 10),
    },
    db: {
      name: <string>processEnv.DB_NAME,
      host: <string>processEnv.DB_HOST,
      port: parseInt(<string>processEnv.DB_PORT, 10),
      username: <string>processEnv.DB_USERNAME,
      password: <string>processEnv.DB_PASSWORD,
      synchronize: <string>processEnv.DB_SYNCHRONIZE === 'true',
    },
    jwt: {
      secret: <string>processEnv.JWT_SECRET,
      expirationTime: parseInt(<string>processEnv.JWT_EXPIRATION_TIME, 10),
    },
  };
}
