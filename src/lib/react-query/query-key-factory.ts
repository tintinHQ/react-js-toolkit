import type { QueryKey } from "@tanstack/react-query";

type QKey = QueryKey;
/**
 * @description
 * Tuple generator for set of keys for a domain.
 * we using this helper only for type-safety => we return k as-is const type.
 * @example
 * const keys = generateTupleKey("posts", "1");
 * keys => ["posts", "1"] as const
 */
export const generateTupleKey = <T extends QKey>(...k: T) => k;

// Namespaced builder for a domain root
export function queryKey_namespace_builder<TPrefix extends string>(
  prefix: TPrefix
) {
  const root = generateTupleKey(prefix);
  return {
    root, // get root keys of domain
    all: () => root, // get shared keys of domain
    // helper to append arbitrary key safely to the domain
    key: <T extends QKey>(...rest: T) =>
      generateTupleKey(prefix, ...rest) as readonly [TPrefix, ...T],
  };
}

/**
 * @description
 * we using this queryKey_namespace_builder to create a namespace for a domain query keys.
 * E.g. we can create keys.ts per domain...
 * @example
 * const users = queryKey_namespace_builder("users");
 * users.key("1"); // ["users", "1"] as const
 * users.key("2"); // ["users", "2"] as const
 * users.key("3"); // ["users", "3"] as const
 * users.all(); // ["users"] as const
 * users.root; // ["users"] as const
 * later we can invalidate all keys of the namespace with:
 * queryClient.invalidateQueries({ queryKey: users.all() });
 * or invalidate a specific key with:
 * queryClient.invalidateQueries({ queryKey: users.key("1") });
 */
