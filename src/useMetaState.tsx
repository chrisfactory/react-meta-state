import { useState } from 'react';
import resolveState from './helpers';
import { DefaultDataError, ReadOnlyDataError } from './DataErrorService';
import {
  MetaService,
  MetaState,
  MetaStateBox,
  MetaStateContext,
} from './MetaState';

function useMetaState<S = undefined>(): [
  S | undefined,
  MetaState<S | undefined>,
];
function useMetaState<S>(initialState: S | (() => S)): [S, MetaState<S>];

function useMetaState<S = undefined>(
  initialState: S | (() => S) | undefined = undefined,
): [S | undefined, MetaState<S>] {
  function getDefaultMetaState(): MetaStateBox<S | undefined> {
    const result: MetaStateBox<S | undefined> = {
      Value: resolveState(initialState),
      services: [],
      ...DefaultDataError(),
    };
    return result;
  }

  const [metaState, setMetaState] = useState<MetaStateBox<S | undefined>>(
    getDefaultMetaState,
  );

  function setVale(value: S | undefined) {
    const newBox: MetaStateBox<S | undefined> = { ...metaState, Value: value };

    metaState.services.forEach((service) => {
      service.OnValueChanging(value, newBox);
    });

    setMetaState(newBox);
  }
  function addService(service: MetaService) {
    if (metaState.services.length === 0) {
      setMetaState({
        Value: metaState.Value,
        services: [service],
        dataErrors: [],
        hasError: false,
      });
    }
  }

  function buildMetaState(): MetaState<S | undefined> {
    const setter: (value: S | undefined) => void = setVale;
    const dataError: ReadOnlyDataError = {
      dataErrors: metaState.dataErrors,
      hasError: metaState.hasError,
    };
    const context: MetaStateContext = { addService };
    const result: MetaState<S | undefined> = Object.assign(
      setter,
      dataError,
      context,
    );
    return result;
  }
  return [metaState.Value, buildMetaState()];
}
export { useMetaState as default };
