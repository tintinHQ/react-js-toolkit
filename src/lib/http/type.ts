import type { AxiosRequestConfig, AxiosError } from "axios";

/**TODO: If your backend wraps API responses, adjust this. Envelope interface */
export type ApiEnvelope<T> = {
  data: T;
  message?: string;
  code?: string | number; // if using union of string | number should use == in use-cases
};

export type PaginatedEnvelope<T> = ApiEnvelope<T[]> & {
  result_info: {
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
  };
};

export type QueryPrimitive = string | number | boolean | null | undefined;
export type QueryValue = QueryPrimitive | QueryPrimitive[];
export type QueryParams = Record<string, QueryValue>;

export type RequestConfig = Omit<
  AxiosRequestConfig,
  "url" | "method" | "data" | "params"
>;

/**TODO: If your backend wraps API responses, adjust this. Error interface */
export type ApiErrorBody = {
  data?: unknown;
  code?: string;
  message?: string;
};
export type ApiError = AxiosError<ApiErrorBody>;

export type RefreshTokenResponse = {
  access_token: string;
};
export type RefreshPromise = Promise<string | null>;
