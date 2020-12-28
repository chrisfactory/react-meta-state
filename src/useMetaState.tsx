import { useState } from 'react';
import resolveState from './helpers';
import { DefaultDataError } from './DataErrorService';
import { MetaState, MetaStateContext } from './MetaState';

function useMetaState<S = undefined>(
  initialState: S | (() => S) | undefined = undefined,
): [S | undefined, MetaState<S>] {
  const [metaState, setMetaState] = useState<MetaStateBox<S>>({
    Value: resolveState(initialState),
    services: [],
    ...DefaultDataError(),
  });
  function setVale(value: S) {
    metaState.services.forEach((service) => {
      service.OnValueChanging(value);
    });

    setMetaState({
      Value: value,
      services: [],
      dataErrors: [],
      hasError: false,
    });
  }

  return [
    metaState.Value,
    Object.assign((v) => setVale(v), metaState) as MetaState<S>,
  ];
  interface MetaStateBox<S = undefined> extends MetaStateContext {
    Value: S | undefined;
  }
}
export { useMetaState as default };
