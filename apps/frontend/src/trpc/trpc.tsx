// src/utils/trpc.js

import { createTRPCReact } from '@trpc/react-query';
import { createTRPCProxyClient, httpBatchLink   } from '@trpc/client';
import type { AppRouter } from '../../../backend/src/trpc/routers/appRouter';
import superjson from 'superjson';

const trpc = createTRPCReact<AppRouter>();

const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
  transformer: superjson
})

export { trpc, trpcClient };
