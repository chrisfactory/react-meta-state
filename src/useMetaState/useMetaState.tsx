import React from 'react';
import resolveState from '../helpers';

export type MetaStateContext = MetaStateServices;
export type MetaState<S = undefined> = MetaStateContext & ((value: S) => void);

function useMetaState<S = undefined>(
  initialState: S | (() => S) | undefined = undefined,
): [S | undefined, MetaState<S>] {
  const [metaState, setMetaState] = React.useState<MetaStateBox<S>>({
    Value: resolveState(initialState),
    services: ['hello'],
  });
  function setVale(value: S) {
    setMetaState({
      Value: value,
      services: ['hello'],
    });
  }

  return [
    metaState.Value,
    Object.assign((v) => setVale(v), {
      services: metaState.services,
    }) as MetaState<S>,
  ];
  interface MetaStateBox<S = undefined> extends MetaStateServices {
    Value: S | undefined;
  }
}
export { useMetaState as default };

/** @internal */
export interface MetaStateServices {
  /** @internal */
  services: any[];
}
