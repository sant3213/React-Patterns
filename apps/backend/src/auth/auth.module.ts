import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,  
    JwtModule.registerAsync({
      imports: [ConfigModule], // Make sure ConfigModule is globally imported or imported here
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
    /*PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use your JWT secret from environment or config
      signOptions: { expiresIn: '60s' }, // Example, adjust as necessary
    }) */
  ],
  
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
