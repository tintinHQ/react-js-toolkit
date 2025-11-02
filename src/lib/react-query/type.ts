import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";

// TODO: add Error type instead of unknown based on the response...

/** 
 @description:
 using this custom Generic type for better type inference and readability...

 TQueryFnData: the data returned from the service layer
 TQueryFnModel: the model of transformed data from the service layer
 TError: the error returned from the service layer
 TQueryKey: the key used to identify the query

*/

export type TUseQueryOptions<
  TQueryFnData,
  TQueryFnModel = TQueryFnData,
  TError = unknown,
  TQueryKey extends QueryKey = QueryKey
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TQueryFnModel, TQueryKey>,
  "queryKey" | "queryFn" | "select"
>;
