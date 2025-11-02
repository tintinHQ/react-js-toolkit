import { ReactQueryProvider } from "@/lib/react-query";
import "./App.css";

function App() {
  return (
    <ReactQueryProvider>
      <main className="documentation">
        <section>
          <h1>React Query Toolkits</h1>
          <p>
            Toolkit for wiring <code>@tanstack/react-query</code> with an Axios
            service layer. The goal is to share a reusable HTTP client, query
            client defaults, and helpers across React front-ends without forcing
            a specific framework.
          </p>
        </section>

        <section>
          <h2>Install</h2>
          <pre>
            <code>pnpm add @tanstack/react-query axios</code>
          </pre>
        </section>

        <section>
          <h2>What You Get</h2>
          <ul>
            <li>
              <code>http/axios-client.ts</code>: Axios instance with
              refresh-token retry, request/response interceptors, and a token
              store.
            </li>
            <li>
              <code>http/make-http.ts</code>: Thin wrappers for GET, POST, PUT,
              PATCH, DELETE to keep return types consistent.
            </li>
            <li>
              <code>react-query/react-query.default.ts</code>: Shared cache +
              default options for queries and mutations.
            </li>
            <li>
              <code>react-query/ReactQueryProvider.tsx</code>: Provider that
              composes the defaults into a <code>QueryClient</code>.
            </li>
            <li>
              <code>react-query/query-key-factory.ts</code>: Helpers for
              building namespaced query keys.
            </li>
          </ul>
        </section>

        <section>
          <h2>How To Use</h2>
          <ol>
            <li>
              Configure HTTP layer: update <code>BASE_URL</code> and{" "}
              <code>REFRESH_PATH</code> in{" "}
              <code>http/axios-client.ts</code> and wire your refresh flow.
            </li>
            <li>
              Wrap your app with <code>ReactQueryProvider</code>.
            </li>
            <li>
              Call services via <code>http</code> helpers and query key
              builders.
            </li>
          </ol>
        </section>

        <section>
          <h2>Customize Further</h2>
          <ul>
            <li>
              Override query cache behavior in{" "}
              <code>react-query/react-query.default.ts</code>.
            </li>
            <li>
              Extend the HTTP helpers to match your backend response envelope.
            </li>
            <li>
              Replace the in-memory token store if you need persistence.
            </li>
            <li>
              Replace Error body type in <code>http/type.ts</code> to match your backend response.
            </li>
          </ul>
        </section>

        <section>
          <h2>Development</h2>
          <pre>
            <code>
              pnpm install{"\n"}
              pnpm build{"\n"}
              pnpm dev
            </code>
          </pre>
        </section>
      </main>
    </ReactQueryProvider>
  );
}

export default App;
