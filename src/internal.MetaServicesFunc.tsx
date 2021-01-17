import { SetStateAction } from 'react';
import {
  IInteractiveServiceProducer,
  InteractiveService,
} from './services/IInteractiveServiceDescriptor';
import serviceContainer from './services/ServiceContainer';

interface Box {
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
  value: S,
  servicesProducer: IInteractiveServiceProducer<any>[],
  services: ReadonlyArray<InteractiveService>,
  event: string,
): Box {
  const dataByService: any[] = [];
  servicesProducer.forEach((producer) => {
    const partialResult = producer.getPartialInteractiveOject(
      services,
      value,
      event,
    );
    dataByService[producer.identifier] = partialResult;
  });
  return { dataByService };
}
export { resolveState, getBox, getInteractiveServiceProducer };
export type { Box };
