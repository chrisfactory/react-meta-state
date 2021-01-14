import { Dispatch, SetStateAction, useState } from 'react';
import {
  Box,
  getBox,
  getInteractiveServiceProducer,
} from './internal.MetaServicesFunc';
import {
  IInteractiveContext,
  IInteractiveServiceProducer,
  InteractiveServices,
} from './services/IInteractiveServiceDescriptor';
import { ServiceResult } from './services/ServiceResult';

function useMetaState<T extends InteractiveServices, S = undefined>(
  ...args: T
): [S | undefined, Dispatch<SetStateAction<S | undefined>> & ServiceResult<T>];
function useMetaState<T extends InteractiveServices, S>(
  initialState: S | (() => S),
  ...args: T
): [S, Dispatch<SetStateAction<S>> & ServiceResult<T>];
function useMetaState<S = undefined>(
  initialState: S | (() => S) | undefined = undefined,
  ...args: InteractiveServices
) {
  const [interactiveServices] = useState<IInteractiveServiceProducer<any>[]>(
    getInteractiveServiceProducer(args),
  );

  const [box, setBox] = useState<Box<S | undefined>>(
    getBox(initialState, interactiveServices, args, 'loaded'),
  );
  let lastBox: Box<S | undefined> = box;
  const setValue: Dispatch<SetStateAction<S | undefined>> = (
    value: SetStateAction<S | undefined>,
  ) => {
    lastBox = getBox(value, interactiveServices, args, 'changed');
    setBox(lastBox);
  };

  function SetFromInteract(identifier: string, data: any) {
    lastBox = { value: lastBox.value, dataByService: lastBox.dataByService };
    lastBox.dataByService[identifier] = data;
    setBox(lastBox);
  }

  function Wrap(): any {
    let finalResult: any[] = box.dataByService;
    const interactRequest: IInteractiveContext<S> = {
      interactionCallback: SetFromInteract,
      value: box.value,
      services: args,
    };
    const getContext = () => interactRequest;
    interactiveServices.forEach((producer) => {
      const result = producer.getInteractiveOject(
        finalResult[producer.identifier],
        getContext,
      );
      finalResult = { ...finalResult, ...result };
    });
    return finalResult;
  }

  return [box.value, Object.assign(setValue, Wrap())];
}
export { useMetaState as default };
