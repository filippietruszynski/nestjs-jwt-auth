import * as Joi from 'joi';
import { Environment } from './types/config.types';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .required()
    .valid(Environment.Development, Environment.Production, Environment.Test),
  APP_HOST: Joi.string().required(),
  APP_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_SYNCHRONIZE: Joi.boolean().required(),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.number().required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.number().required(),
});
