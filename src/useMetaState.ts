import { Dispatch, SetStateAction, useState } from 'react';
import { resolveSetStateAction, resolveState, MergeBuilder } from './helpers';
import { IMetaService } from './Services.IMetaService';
import { Interact } from './Services.InteractMetaService';

function useMetaState<T1 extends IMetaService, S = undefined>(
  s1: T1,
): [S | undefined, Dispatch<SetStateAction<S | undefined>> & Interact<T1>];
function useMetaState<
  T1 extends IMetaService,
  T2 extends IMetaService,
  S = undefined
>(
  s1: T1,
  s2: T2,
): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>> & Interact<T1> & Interact<T2>,
];
function useMetaState<
  T1 extends IMetaService,
  T2 extends IMetaService,
  T3 extends IMetaService,
  S = undefined
>(
  s1: T1,
  s2: T2,
  s3: T3,
): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>> &
    Interact<T1> &
    Interact<T2> &
    Interact<T3>,
];
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
): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>> &
    Interact<T1> &
    Interact<T2> &
    Interact<T3> &
    Interact<T4>,
];
function useMetaState<T1 extends IMetaService, S>(
  initialState: S | (() => S),
  s1: T1,
): [S, Dispatch<SetStateAction<S>> & Interact<T1>];
function useMetaState<T1 extends IMetaService, T2 extends IMetaService, S>(
  initialState: S | (() => S),
  s1: T1,
  s2: T2,
): [S, Dispatch<SetStateAction<S>> & Interact<T1> & Interact<T2>];
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
): [
  S,
  Dispatch<SetStateAction<S>> & Interact<T1> & Interact<T2> & Interact<T3>,
];
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
): [
  S,
  Dispatch<SetStateAction<S>> &
    Interact<T1> &
    Interact<T2> &
    Interact<T3> &
    Interact<T4>,
];

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
    const srv = args;
    srv.forEach((service) => {
      service.refresh(val, 'changed');
    });
    setBox({ value: val, services: srv });
  };
  function WrapInteract(services: IMetaService[]): Interact<IMetaService>[] {
    const interactableServices: Interact<IMetaService>[] = [];
    services.forEach((service) => {
      const interactable: Interact<IMetaService> = {
        interact: (s) => {
          const refBox = box;
          const idx = refBox.services.findIndex(
            (original) => original === service,
          );
          service.refresh(refBox.value, s);
          refBox.services[idx] = service;
          setBox({ value: refBox.value, services: refBox.services });
          return service;
        },
        ...service,
      };
      interactableServices.push(interactable);
    });
    return interactableServices;
  }

  return [
    box.value,
    Object.assign(setValue, MergeBuilder(WrapInteract(box.services))),
  ];
  interface Box<S> {
    value: S | undefined;
    services: IMetaService[];
  }
}
export { useMetaState as default };
