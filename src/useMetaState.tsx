import { Dispatch, SetStateAction, useState } from 'react';
import { resolveSetStateAction, resolveState } from './helpers';
import MergeBuilder from './MergeBuilder';
import { IMetaService } from './serviceBase';

function useMetaState<T1 extends IMetaService, S = undefined>(
  s1: T1,
): [S | undefined, Dispatch<SetStateAction<S | undefined>> & T1];
function useMetaState<
  T1 extends IMetaService,
  T2 extends IMetaService,
  S = undefined
>(
  s1: T1,
  s2: T2,
): [S | undefined, Dispatch<SetStateAction<S | undefined>> & T1 & T2];
function useMetaState<
  T1 extends IMetaService,
  T2 extends IMetaService,
  T3 extends IMetaService,
  S = undefined
>(
  s1: T1,
  s2: T2,
  s3: T3,
): [S | undefined, Dispatch<SetStateAction<S | undefined>> & T1 & T2 & T3];
function useMetaState<
  T1 extends IMetaService,
  T2 extends IMetaService,
  T3 extends IMetaService,
  T4 extends IMetaService,
  S = undefined
>(
  s1: T1,
  s2: T2,
  s3: T3,
  s4: T4,
): [S | undefined, Dispatch<SetStateAction<S | undefined>> & T1 & T2 & T3 & T4];
function useMetaState<T1 extends IMetaService, S>(
  initialState: S | (() => S),
  s1: T1,
): [S, Dispatch<SetStateAction<S>> & T1];
function useMetaState<T1 extends IMetaService, T2 extends IMetaService, S>(
  initialState: S | (() => S),
  s1: T1,
  s2: T2,
): [S, Dispatch<SetStateAction<S>> & T1 & T2];
function useMetaState<
  T1 extends IMetaService,
  T2 extends IMetaService,
  T3 extends IMetaService,
  S
>(
  initialState: S | (() => S),
  s1: T1,
  s2: T2,
  s3: T3,
): [S, Dispatch<SetStateAction<S>> & T1 & T2 & T3];
function useMetaState<
  T1 extends IMetaService,
  T2 extends IMetaService,
  T3 extends IMetaService,
  T4 extends IMetaService,
  S
>(
  initialState: S | (() => S),
  s1: T1,
  s2: T2,
  s3: T3,
  s4: T4,
): [S, Dispatch<SetStateAction<S>> & T1 & T2 & T3 & T4];

function useMetaState<S = undefined>(
  initialState: S | (() => S) | undefined = undefined,
  ...args: IMetaService[]
) {
  const [box, setBox] = useState<Box<S | undefined>>({
    value: resolveState(initialState),
    services: args,
  });

  const setValue: Dispatch<SetStateAction<S | undefined>> = (
    value: SetStateAction<S | undefined>,
  ) => {
    const val = resolveSetStateAction(value, box.value);
    box.services.forEach((service) => {
      service.Refresh(val, 'changed');
    });
    setBox({ value: val, services: box.services });
  };
  return [box.value, Object.assign(setValue, MergeBuilder(box.services))];
  interface Box<S> {
    value: S | undefined;
    services: IMetaService[];
  }
}
export { useMetaState as default };
