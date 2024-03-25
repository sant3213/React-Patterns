import { UseCarsReturn } from "./ICar";
import { trpc } from "../trpc/trpc";

export const UseCars = (url: string): UseCarsReturn => {
    const { data, isLoading, error } = trpc.cars.getCars.useQuery();
    
    // The hook directly returns the data, loading state, and any error from the tRPC query.
    return { data, loading: isLoading, error };

}
