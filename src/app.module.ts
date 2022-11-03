import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './events/event.entity';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/user.entity';
import { config } from './config/config';
import { envValidationSchema } from './config/config.validation';
import { Config } from './config/config.constants';

@Module({
  imports: [
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
          entities: [UserEntity, EventEntity],
          db: configService.get('db.name', { infer: true }),
          host: configService.get('db.host', { infer: true }),
          port: configService.get('db.port', { infer: true }),
          username: configService.get('db.username', { infer: true }),
          password: configService.get('db.password', { infer: true }),
          synchronize: configService.get('db.synchronize', { infer: true }),
        };
      },
    }),
    AuthModule,
    EventsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
