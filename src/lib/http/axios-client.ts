import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  type ApiErrorBody,
  type RefreshPromise,
  type RefreshTokenResponse,
  makeHttp,
  HTTP_STATUS_CODE,
  tokenStore,
} from "@/lib/http";

// CONSTANTS
// TODO: change to your paths based on your backend
const BASE_URL = "https://api.example.com";
const REFRESH_PATH = "/auth/refresh";

/** ---------- Refresh token requests ---------- **/
// separate axios instance for refresh token requests only
const refreshClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  withCredentials: true,
});
const { POST } = makeHttp(refreshClient);

let refreshPromise: RefreshPromise | null = null;
async function refreshAccessToken(): NonNullable<RefreshPromise> {
  if (refreshPromise) return refreshPromise;

  return (refreshPromise = (async () => {
    try {
      const res = await POST<RefreshTokenResponse>(REFRESH_PATH);
      const newToken = res?.access_token ?? null;
      tokenStore.set(newToken);
      return newToken;
    } catch {
      tokenStore.set(null);
      return null;
      //TODO: logout user in here
    } finally {
      const p = refreshPromise as RefreshPromise | null;
      refreshPromise = null;
      await p?.catch(() => undefined);
    }
  })());
}

/** ---------- Axios instance ---------- **/
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/** ---------- Auth header injection ---------- **/

/** ---------- Request interceptor ---------- **/
function requestInterceptor(config: InternalAxiosRequestConfig) {
  const token = tokenStore.get();
  if (token == undefined) return config;

  config.headers = config.headers ?? {};
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
}

api.interceptors.request.use(requestInterceptor);

/** ---------- Response interceptor ---------- **/

function responseInterceptor(response: AxiosResponse) {
  return response.data;
}

const RETRIED = Symbol("RETRIED");
async function errorInterceptor(error: AxiosError<ApiErrorBody>) {
  const status = Number(error.response?.status);
  const cfg = (error.config || {}) as AxiosRequestConfig & {
    [RETRIED]?: boolean;
  };
  const url = cfg.url || "";

  if (status == undefined) return Promise.reject(error);
  const isRefreshCall = url.includes(REFRESH_PATH);

  const isNormalUnauthorized =
    status === HTTP_STATUS_CODE.Unauthorized && !isRefreshCall && !cfg[RETRIED];

  if (isNormalUnauthorized) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      cfg[RETRIED] = true;
      cfg.headers = cfg.headers ?? {};
      cfg.headers.Authorization = `Bearer ${newToken}`;
      return api(cfg);
    } else {
      // TODO: Refresh failed → consider logout here (clear caches, navigate)
      return Promise.reject(error);
    }
  }
  switch (status) {
    case HTTP_STATUS_CODE.Forbidden: {
      // 403 → show "no permission" toast
      break;
    }

    case HTTP_STATUS_CODE.NotFound: {
      // maybe route to 404 page
      break;
    }

    case HTTP_STATUS_CODE.Conflict: {
      // 409 → show "conflict" toast
      break;
    }

    case HTTP_STATUS_CODE.Gone: {
      // 410 → show "gone" toast
      break;
    }

    case HTTP_STATUS_CODE.TooManyRequests: {
      // throttle warnings or exponential backoff
      break;
    }

    default:
      if (status && status >= 500) console.error("Server error:", status);
      return Promise.reject(error);
  }
}

api.interceptors.response.use(responseInterceptor, errorInterceptor);

const http = makeHttp(api);
export { api, http, requestInterceptor, responseInterceptor, errorInterceptor };
