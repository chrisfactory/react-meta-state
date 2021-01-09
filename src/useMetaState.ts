import { Dispatch, SetStateAction, useState } from 'react';
import { Box, getBox } from './internal.MetaServicesFunc';
import { IInteractData, MetaService } from './services/IServiceDescriptor';
import { ServiceResult } from './services/ServiceResult';

function useMetaState<T1 extends MetaService, S = undefined>(
  s1: T1,
): [S | undefined, Dispatch<SetStateAction<S | undefined>> & ServiceResult<T1>];
function useMetaState<
  T1 extends MetaService,
  T2 extends MetaService,
  S = undefined
>(
  s1: T1,
  s2: T2,
): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>> &
    ServiceResult<T1> &
    ServiceResult<T2>,
];
function useMetaState<
  T1 extends MetaService,
  T2 extends MetaService,
  T3 extends MetaService,
  S = undefined
>(
  s1: T1,
  s2: T2,
  s3: T3,
): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>> &
    ServiceResult<T1> &
    ServiceResult<T2> &
    ServiceResult<T3>,
];
function useMetaState<
  T1 extends MetaService,
  T2 extends MetaService,
  T3 extends MetaService,
  T4 extends MetaService,
  S = undefined
>(
  s1: T1,
  s2: T2,
  s3: T3,
  s4: T4,
): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>> &
    ServiceResult<T1> &
    ServiceResult<T2> &
    ServiceResult<T3> &
    ServiceResult<T4>,
];
function useMetaState<T1 extends MetaService, S>(
  initialState: S | (() => S),
  s1: T1,
): [S, Dispatch<SetStateAction<S>> & ServiceResult<T1>];
function useMetaState<T1 extends MetaService, T2 extends MetaService, S>(
  initialState: S | (() => S),
  s1: T1,
  s2: T2,
): [S, Dispatch<SetStateAction<S>> & ServiceResult<T1> & ServiceResult<T2>];
function useMetaState<
  T1 extends MetaService,
  T2 extends MetaService,
  T3 extends MetaService,
  S
>(
  initialState: S | (() => S),
  s1: T1,
  s2: T2,
  s3: T3,
): [
  S,
  Dispatch<SetStateAction<S>> &
    ServiceResult<T1> &
    ServiceResult<T2> &
    ServiceResult<T3>,
];
function useMetaState<
  T1 extends MetaService,
  T2 extends MetaService,
  T3 extends MetaService,
  T4 extends MetaService,
  S
>(
  initialState: S | (() => S),
  s1: T1,
  s2: T2,
  s3: T3,
  s4: T4,
): [
  S,
  Dispatch<SetStateAction<S>> &
    ServiceResult<T1> &
    ServiceResult<T2> &
    ServiceResult<T3> &
    ServiceResult<T4>,
];

function useMetaState<S = undefined>(
  initialState: S | (() => S) | undefined = undefined,
  ...args: ReadonlyArray<MetaService>
) {
  let lastBox: Box<S | undefined> = getBox(initialState, args, 'init');
  const [box, setBox] = useState<Box<S | undefined>>(lastBox);

  const setValue: Dispatch<SetStateAction<S | undefined>> = (
    value: SetStateAction<S | undefined>,
  ) => {
    lastBox = getBox(value, args, 'changed');
    setBox(lastBox);
  };

  function SetFromInteract(data: any) {
    lastBox = { value: lastBox.value, data: { ...lastBox.data, ...data } };
    setBox(lastBox);
  }

  function Wrap(): any {
    let finalResult: any = box.data;
    const srv = args;
    srv.forEach((service) => {
      const interactRequest: IInteractData<S> = {
        callback: SetFromInteract,
        value: box.value,
        services: args,
      };
      const result = service.resultFactory.getInteraction(
        () => interactRequest,
      );
      finalResult = { ...finalResult, ...result };
    });
    return finalResult;
  }

  return [box.value, Object.assign(setValue, Wrap())];
}
export { useMetaState as default };
