import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  } from './trpc/routers/appRouter';
import { TrpcRouter } from './trpc/trpc-router/trpc-router.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, // To allow sending cookies and authentication headers
  });

/*   const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);

  app.use('/trpc', createExpressMiddleware({ router: appRouter }));

  await app.listen(4000); */
  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);
  await app.listen(4000);

  
}
bootstrap();
