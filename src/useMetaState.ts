import { Dispatch, SetStateAction, useState } from 'react';
import { resolveSetStateAction, resolveState } from './helpers';
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
  function extractDefaultDataValue(): any {
    const srvices = args;
    let finalResult: any = {};
    srvices.forEach((service) => {
      finalResult = { ...finalResult, ...service.resultFactory.default };
    });
    return finalResult;
  }
  const [box, setBox] = useState<Box<S | undefined>>({
    value: resolveState(initialState),
    data: extractDefaultDataValue(),
  });

  const setValue: Dispatch<SetStateAction<S | undefined>> = (
    value: SetStateAction<S | undefined>,
  ) => {
    const val = resolveSetStateAction(value, box.value);
    const srvices = args;
    const resultHash: any[] = [];
    let finalResult: any = {};
    srvices.forEach((service) => {
      const id = service.resultFactory.identifier;
      const result = service.resultFactory.getResult(
        resultHash[id],
        val,
        'changed',
      );
      resultHash[id] = result;
      finalResult = { ...finalResult, ...result };
    });
    setBox({ value: val, data: finalResult });
  };

  let lastDataValue: any;
  function SetFromInteract(data: any) {
    if (!lastDataValue) lastDataValue = box.data;
    lastDataValue = { ...lastDataValue, ...data };
    setBox({ value: box.value, data: lastDataValue });
  }
  function Wrap(): any {
    let finalResult: any = box.data;
    const srv = args;
    srv.forEach((service) => {
      const interactRequest: IInteractData<S> = {
        interactCallback: SetFromInteract,
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
  interface Box<S> {
    value: S | undefined;
    data: any;
  }
}
export { useMetaState as default };
