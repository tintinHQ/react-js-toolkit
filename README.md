# React Toolkits

Toolkit for wiring `@tanstack/react-query` with an Axios service layer. The goal is to share a reusable HTTP client, query client defaults, and helpers across React front-ends without forcing a specific framework.

## Install

```bash
pnpm add @tanstack/react-query axios
```

Copy the `src/lib` directory (or specific modules) into your project. The codebase expects TypeScript and modern bundlers (Vite, Next, etc.).

## What You Get

- `http/axios-client.ts`: Axios instance with refresh-token retry, request/response interceptors, and a token store.
- `http/make-http.ts`: Thin wrappers for `GET`, `POST`, `PUT`, `PATCH`, `DELETE` to keep return types consistent.
- `react-query/react-query.default.ts`: Shared cache + default options for queries and mutations.
- `react-query/ReactQueryProvider.tsx`: Provider that composes the defaults into a `QueryClient`.
- `react-query/query-key-factory.ts`: Helpers for building namespaced query keys.

## How To Use

1. **Configure HTTP layer**
   - Update `BASE_URL` and `REFRESH_PATH` in `http/axios-client.ts` to match your backend.
   - Wire your real refresh flow inside `refreshAccessToken` and the `tokenStore`.
2. **Wrap your app**
   ```tsx
   import { ReactQueryProvider } from "@/lib/react-query";

   export function App() {
     return (
       <ReactQueryProvider>
         <YourChildElements />
       </ReactQueryProvider>
     );
   }
   ```
3. **Call services with helpers**
   ```ts
   import { http, queryKey_namespace_builder } from "@/lib";

   const todosKeys = queryKey_namespace_builder("todos");
   export async function getTodos() {
     return http.GET<Todo[]>("/todos");
   }
   ```

## Customize Further

- Override query cache behavior in `react-query/react-query.default.ts`.
- Extend the HTTP helpers with adapters per backend response envelope.
- Replace the in-memory token store if you need persistence.

Use this repository as a starting point and adapt it to your project’s routing, auth, and UI conventions.
