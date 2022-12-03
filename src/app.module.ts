import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './auth/guards';
import { EventsModule } from './events/events.module';
import { Event } from './events/event.entity';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { Config, config, envValidationSchema } from './config';

@Module({
  imports: [
    AuthModule,
    EventsModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: envValidationSchema,
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => {
        return {
          type: 'postgres',
          entities: [User, Event],
          db: configService.get('db.name', { infer: true }),
          host: configService.get('db.host', { infer: true }),
          port: configService.get('db.port', { infer: true }),
          username: configService.get('db.username', { infer: true }),
          password: configService.get('db.password', { infer: true }),
          synchronize: configService.get('db.synchronize', { infer: true }),
        };
      },
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
