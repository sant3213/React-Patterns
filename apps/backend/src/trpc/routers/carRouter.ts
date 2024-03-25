import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();
const carRouter = t.router({
   register: t.procedure
    .input(z.object({
      brand: z.string().min(1, "Brand car is required"),
      horsePower: z.string().min(1, "Horsepower is required"),
    }))
    .mutation(async ({ input }) => {
      // Registration logic here
      return { message: `Car ${input.brand} registered successfully.` };
    }), 
    getCars: t.procedure.query(async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch cars. Status: ${response.status}`);
      }
      const cars = await response.json();
      return cars;
    }),
});

// In carRouter or directly in appRouter for testing
/* const testRouter = t.router({
  test: t.procedure.query(() => {
    return { message: "This is a test" };
  }),
}); */


export default carRouter;//carRouter;
