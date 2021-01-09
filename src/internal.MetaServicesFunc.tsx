import { SetStateAction } from 'react';
import { MetaService } from './services/IServiceDescriptor';

interface Box<S> {
  value: S | undefined;
  data: any;
}

// prev state!
function resolveState<S = undefined>(
  state: S | (() => S) | SetStateAction<S | undefined> | undefined = undefined,
) {
  if (typeof state === 'function') return (state as () => S)();
  return state as S | undefined;
}
// function resolveSetStateAction<S = undefined>(
//   state: SetStateAction<S | undefined>,
//   prevState: S,
// ) {
//   if (typeof state === 'function')
//     return (state as (prevState: S) => S)(prevState);
//   return state as S | undefined;
// }
function getBox<S>(
  fromData: S | (() => S) | SetStateAction<S | undefined> | undefined,
  services: ReadonlyArray<MetaService>,
  event: string,
): Box<S | undefined> {
  const value = resolveState(fromData);
  let data: any = {};
  const resultHash: any[] = [];
  services.forEach((service) => {
    const id = service.dataProducer.identifier;
    const result = service.dataProducer.getData(resultHash[id], value, event);
    resultHash[id] = result;
    data = { ...data, ...result };
  });
  return { value, data };
}
export { resolveState, getBox };
export type { Box };
