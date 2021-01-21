import { IInteractiveServiceProducer } from '../services/IInteractiveServiceDescriptor';
import serviceContainer from '../services/ServiceContainer';

function interactiveProducer(serviceName: string) {
  return function X<
    T extends { new (...args: any[]): IInteractiveServiceProducer<any> }
  >(constructor: T) {
    const Ctor = class extends constructor {
      identifier = serviceName;
    };
    const instance = new Ctor();
    serviceContainer.AddInteractiveService(serviceName, instance);
    return Ctor;
  };
}

export { interactiveProducer as default };
