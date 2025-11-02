let _access: string | null = null;
const subs = new Set<(t: string | null) => void>();

export const tokenStore = {
  get: () => _access,
  set: (t: string | null) => {
    _access = t;
    subs.forEach((fn) => fn(t));
    return;
  },
  subscribe: (fn: (t: string | null) => void) => {
    subs.add(fn);
    return () => subs.delete(fn);
  },
};
