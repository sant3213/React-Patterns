import { Module } from '@nestjs/common';
import { TrpcService } from './trpc/trpc.service';
import { TrpcRouter } from './trpc-router/trpc-router.service';
@Module({
  providers: [TrpcService, TrpcRouter]
})
export class TrpcModule {
   /*  configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(TrpcMiddleware)
          .forRoutes({ path: 'trpc/*', method: RequestMethod.ALL });
      } */
}
