import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  mutation_cache,
  mutation_default_options,
  queries_default_options,
  query_cache,
} from "@/lib/react-query";
import { useMemo } from "react";

type ReactQueryProviderProps = {
  children: React.ReactNode;
};
export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const TANSTACK_QUERY_CLIENT = useMemo(
    () =>
      new QueryClient({
        queryCache: new QueryCache({ ...query_cache }),
        mutationCache: new MutationCache({ ...mutation_cache }),

        defaultOptions: {
          mutations: mutation_default_options,
          queries: queries_default_options,
          // TODO: add other participants config in here
        },
      }),
    []
  );

  return (
    <QueryClientProvider client={TANSTACK_QUERY_CLIENT}>
      {children}
    </QueryClientProvider>
  );
};
