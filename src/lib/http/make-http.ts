import type { AxiosInstance } from "axios";
import type { QueryParams, RequestConfig } from "@/lib/http";

/** TODO: add wrapper interface for the http methods based on 
 backend services when casting the response data */

export function makeHttp(api: AxiosInstance) {
  /** GET with typed query params => resolves to T */
  async function GET<T, Q extends QueryParams = QueryParams, C = RequestConfig>(
    url: string,
    params?: Q,
    config?: C
  ): Promise<T> {
    return api.get<T>(url, { ...config, params }) as Promise<T>;
  }

  /** POST with typed body => resolves to T */
  async function POST<T, B = unknown, C extends RequestConfig = RequestConfig>(
    url: string,
    body?: B,
    config?: C
  ): Promise<T> {
    return api.post<T>(url, body, config) as Promise<T>;
  }

  /** PUT with typed body => resolves to T */
  async function PUT<T, B = unknown, C extends RequestConfig = RequestConfig>(
    url: string,
    body?: B,
    config?: C
  ): Promise<T> {
    return api.put<T>(url, body, config) as Promise<T>;
  }

  /** PATCH with typed body => resolves to T */
  async function PATCH<T, B = unknown, C extends RequestConfig = RequestConfig>(
    url: string,
    body?: B,
    config?: C
  ): Promise<T> {
    return api.patch<T>(url, body, config) as Promise<T>;
  }

  /**
   * DELETE usually returns 204 No Content.
   * If your API returns something, supply T; otherwise default to void.
   */
  async function DELETE<T = void, B = unknown, C = RequestConfig>(
    url: string,
    body?: B, // some APIs accept a body for DELETE; Axios supports it via config.data
    config?: C
  ): Promise<T> {
    return api.delete<T>(url, { ...config, data: body }) as Promise<T>;
  }

  return { GET, POST, PUT, PATCH, DELETE };
}

/* We usnig from enum here for bidirectional type checking and if we ignore this feature 
   using from enum is not recommended because it has runtime value that can be tease us when tree shaking
*/
export enum HTTP_STATUS_CODE {
  // --- 2xx Success ---
  OK = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,

  // --- 3xx Redirects ---
  MovedPermanently = 301,
  Found = 302,
  NotModified = 304,

  // --- 4xx Client errors ---
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  Gone = 410,
  TooManyRequests = 429,

  // --- 5xx Server errors ---
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
}

export const HttpGroups = {
  success: [
    HTTP_STATUS_CODE.OK,
    HTTP_STATUS_CODE.Created,
    HTTP_STATUS_CODE.NoContent,
  ],
  clientError: [
    HTTP_STATUS_CODE.BadRequest,
    HTTP_STATUS_CODE.Unauthorized,
    HTTP_STATUS_CODE.Forbidden,
    HTTP_STATUS_CODE.NotFound,
    HTTP_STATUS_CODE.Conflict,
  ],
  serverError: [
    HTTP_STATUS_CODE.InternalServerError,
    HTTP_STATUS_CODE.BadGateway,
    HTTP_STATUS_CODE.ServiceUnavailable,
    HTTP_STATUS_CODE.GatewayTimeout,
  ],
} as const;
