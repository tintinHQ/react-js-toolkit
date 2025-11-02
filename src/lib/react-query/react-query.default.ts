import type {
  DefaultOptions,
  MutationCache,
  QueryCache,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

/**
 * MutationCacheConfig is the configuration for the MutationCache at the one layer underneath the QueryClient default options.
 * @see https://tanstack.com/query/v5/docs/framework/react/api/MutationCache
 */

type MutationCacheConfig = NonNullable<
  ConstructorParameters<typeof MutationCache>[0]
>;
export const mutation_cache: MutationCacheConfig = {
  /*
  onError(error, variables, context, mutation) {
    // TODO: handle mutation errors
  },
  onSuccess(data, variables, context, mutation) {
    // TODO: handle mutation success
  },
  onSettled(data, error, variables, context, mutation) {
    // TODO: handle mutation settled
  },
  onMutate(variables, context, mutation) {
    // TODO: handle mutation mutate
  },
  */
};

/**
 * MutationDefaultOptions is the configuration for the mutations at the QueryClient default options.
 * @see https://tanstack.com/query/v5/docs/framework/react/api/DefaultOptions
 */

type MutationDefaultOptions = NonNullable<DefaultOptions["mutations"]>;
export const mutation_default_options: MutationDefaultOptions = {
  retry: (failureCount) => failureCount < 3,
  retryDelay: 1000 * 5, // 5 seconds
  gcTime: 1000 * 60 * 10, // 10 minutes
};

/**
 * QueryCacheConfig is the configuration for the QueryCache at the one layer underneath the QueryClient default options.
 * @see https://tanstack.com/query/v5/docs/framework/react/api/QueryCache
 */
type QueryCacheConfig = NonNullable<
  ConstructorParameters<typeof QueryCache>[0]
>;
export const query_cache: QueryCacheConfig = {
  /*
  onError(error, query) {
    // TODO: handle query errors
  },        
  onSuccess(data, query) {
    // TODO: handle query success
  },
  onSettled(data, error, query) {
    // TODO: handle query settled
  },  
  */
};

/**
 * QueryDefaultOptions is the configuration for the queries at the QueryClient default options.
 * @see https://tanstack.com/query/v5/docs/framework/react/api/DefaultOptions
 */

type QueryDefaultOptions = NonNullable<DefaultOptions["queries"]>;
export const queries_default_options: QueryDefaultOptions = {
  staleTime: 1000 * 60 * 10, // 10 minutes
  gcTime: 1000 * 60 * 10, // 10 minutes
  enabled: true,
  refetchInterval: 1000 * 60 * 10, // 10 minutes,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  refetchOnMount: true,
  refetchIntervalInBackground: true,

  retry: (failureCount, error) => {
    const status = (error as AxiosError)?.status;
    if (status === 401 || status === 403) return false;
    return failureCount < 2;
  },
  retryDelay: 1000 * 5, // 5 seconds
  meta: {},
};
