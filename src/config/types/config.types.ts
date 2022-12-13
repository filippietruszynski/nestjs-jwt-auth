/* ENUMS */
export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

/* INTERFACES */
interface AppConfig {
  host: string;
  port: number;
}

interface DbConfig {
  name: string;
  host: string;
  port: number;
  username: string;
  password: string;
  synchronize: boolean;
}

interface JwtConfig {
  accessTokenSecret: string;
  accessTokenExpirationTime: number;
  refreshTokenSecret: string;
  refreshTokenExpirationTime: number;
}

export interface Config {
  app: AppConfig;
  db: DbConfig;
  jwt: JwtConfig;
}
