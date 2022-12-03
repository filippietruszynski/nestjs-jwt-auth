import { Config } from './types';

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
      accessTokenSecret: <string>processEnv.JWT_ACCESS_TOKEN_SECRET,
      accessTokenExpirationTime: parseInt(
        <string>processEnv.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
        10,
      ),
      refreshTokenSecret: <string>processEnv.JWT_REFRESH_TOKEN_SECRET,
      refreshTokenExpirationTime: parseInt(
        <string>processEnv.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
        10,
      ),
    },
  };
}
