import { SetStateAction } from 'react';

function resolveState<S = undefined>(
  state: S | (() => S) | undefined = undefined,
) {
  if (typeof state === 'function') return (state as () => S)();
  return state as S | undefined;
}
function resolveSetStateAction<S = undefined>(
  state: SetStateAction<S | undefined>,
  prevState: S,
) {
  if (typeof state === 'function')
    return (state as (prevState: S) => S)(prevState);
  return state as S | undefined;
}
function MergeBuilder(datas: any[]) {
  let resut: any;
  datas.forEach((element) => {
    resut = { ...resut, ...element };
  });
  return resut;
}

export { resolveState, resolveSetStateAction, MergeBuilder };
