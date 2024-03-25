import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TrpcModule } from './trpc/trpc.module';

@Module({
  imports: [AuthModule, UsersModule,  ConfigModule.forRoot({
    isGlobal: true,
  }), TrpcModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
