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
    () => getInteractiveServiceProducer(args),
  );
  const [lastAction, setLastAction] = useState('loaded');
  const [value, setValue] = useState(initialState);
  let lastBox: Box = getBox(value, interactiveServices, args, lastAction);
  const setDataValue: Dispatch<SetStateAction<S | undefined>> = (
    newValue: SetStateAction<S | undefined>,
  ) => {
    const action = 'changed';
    lastBox = getBox(newValue, interactiveServices, args, action);
    setLastAction(action);
    setValue(newValue);
  };

  function SetFromInteract(identifier: string, data: any, action: string) {
    lastBox = { dataByService: lastBox.dataByService };
    lastBox.dataByService[identifier] = data;
    setLastAction(action);
  }

  function Wrap(): any {
    const dataByService: any[] = lastBox.dataByService;
    let finalResult: any = {};
    const interactRequest: IInteractiveContext<S> = {
      interactionCallback: SetFromInteract,
      value,
      services: args,
    };
    const getContext = () => interactRequest;
    interactiveServices.forEach((producer) => {
      const result = producer.getInteractiveOject(
        dataByService[producer.identifier],
        getContext,
      );
      finalResult = { ...finalResult, ...result };
    });
    return finalResult;
  }

  return [value, Object.assign(setDataValue, Wrap())];
}
export { useMetaState as default };
