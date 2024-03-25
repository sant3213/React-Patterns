/* // src/trpc/trpc.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import   from './routers/appRouter';
import { Logger } from '@nestjs/common';

@Injectable()
export class TrpcMiddleware implements NestMiddleware {
   logger = new Logger();
  use(req: Request, res: Response, next: NextFunction) {
    // Assuming your tRPC app router is an express middleware
    this.logger.log('here-------------')
    const trpcMiddleware = createExpressMiddleware({
      router: AppRouter,
      //createContext: () => ({}), // createContext function here if needed
    });


    if (req.path.startsWith('/trpc')) {
      return trpcMiddleware(req, res, next);
    }

    return next();
  }
} */
