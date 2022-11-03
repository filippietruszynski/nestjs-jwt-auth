/* ENUMS */
export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
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
  secret: string;
  expirationTime: number;
}

// must be unified with envValidationSchema
export interface Config {
  app: AppConfig;
  db: DbConfig;
  jwt: JwtConfig;
}
