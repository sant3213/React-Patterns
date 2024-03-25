import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import carRouter from './carRouter';

const t = initTRPC.create({
  transformer: superjson
});
export const appRouter = t.router({
  cars: carRouter,
});

export type AppRouter = typeof appRouter;
