import { TRPCClientErrorLike } from "@trpc/client";

export interface Car {
    id?: string;
    brand?: string;
    horsePower?: string;
    title: string;
    completed: boolean;
  }
  
export interface UseCarsReturn {
    data: Car[] | null;
    loading: boolean;
    error: TRPCClientErrorLike<any> | null; 
  }

