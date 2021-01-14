import { SetStateAction } from 'react';
import {
  IInteractiveServiceProducer,
  InteractiveService,
} from './services/IInteractiveServiceDescriptor';
import serviceContainer from './services/ServiceContainer';

interface Box<S> {
  value: S | undefined;
  dataByService: any[];
}

// prev state!
function resolveState<S = undefined>(
  state: S | (() => S) | SetStateAction<S | undefined> | undefined = undefined,
) {
  if (typeof state === 'function') return (state as () => S)();
  return state as S | undefined;
}

function getInteractiveServiceProducer(
  services: ReadonlyArray<InteractiveService>,
): IInteractiveServiceProducer<any>[] {
  const map = new Map<string, IInteractiveServiceProducer<any>>();
  services.forEach((service) => {
    if (!map.has(service.serviceName))
      map.set(
        service.serviceName,
        serviceContainer.GetInteractiveService(service),
      );
  });
  const it = map.values();
  return Array.from(it);
}

function getBox<S>(
  fromData: S | (() => S) | SetStateAction<S | undefined> | undefined,
  servicesProducer: IInteractiveServiceProducer<any>[],
  services: ReadonlyArray<InteractiveService>,
  event: string,
): Box<S | undefined> {
  const value = resolveState(fromData);
  const dataByService: any[] = [];
  servicesProducer.forEach((producer) => {
    const partialResult = producer.getPartialInteractiveOject(
      services,
      value,
      event,
    );
    dataByService[producer.identifier] = partialResult;
  });
  return { value, dataByService };
}
export { resolveState, getBox, getInteractiveServiceProducer };
export type { Box };
