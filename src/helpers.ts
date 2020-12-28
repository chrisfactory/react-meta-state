function resolveState<S = undefined>(
  state: S | (() => S) | undefined = undefined,
) {
  if (typeof state === 'function') return (state as () => S)();
  return state as S | undefined;
}

export { resolveState as default };
