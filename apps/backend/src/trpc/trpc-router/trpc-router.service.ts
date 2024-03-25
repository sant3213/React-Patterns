import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from '../trpc/trpc.service';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import carRouter from '../routers/carRouter';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}
  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(
        z.object({
          name: z.string().optional(),
        }),
      )
      .query(({ input }) => {
        const { name } = input;
        return {
          greeting: `Hello ${name ? name : `Sant`}`,
        };
      }),
    
    /**
     * POSTMAN
     * GET
     * http://localhost:4000/trpc/cars?batch=1&input={"0":{}}
     */

    // TODO change by carRouter cars: carRouter,
    cars: this.trpc.procedure.query(async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch cars. Status: ${response.status}`);
      }
      const cars = await response.json();
      return cars;
    }),
    /**
     * POSTMAN
     * GET
     * http://localhost:4000/trpc/test?batch=1&input={"0":{}}
     */
    test:  this.trpc.procedure
    .input(
      z.object({
        name: z.string().optional(),
      }),
    )
    .query(({ }) => {
      return {
        greeting: `Hello Sant`,
      };
    }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}
