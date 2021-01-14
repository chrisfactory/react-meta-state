import {
  IInteractiveServiceProducer,
  InteractiveService,
} from './IInteractiveServiceDescriptor';

interface IServiceContainer {
  GetInteractiveService(
    descriptor: InteractiveService,
  ): IInteractiveServiceProducer<any>;
}
class InternalServiceContainer implements IServiceContainer {
  protected _registryMap = new Map<
    InteractiveService,
    IInteractiveServiceProducer<any>
  >();

  GetInteractiveService(
    descriptor: InteractiveService,
  ): IInteractiveServiceProducer<any> {
    const interactiveService = this._registryMap.get(descriptor);
    if (interactiveService) {
      return interactiveService;
    }
    const addedinteractiveService = descriptor.serviceFactory(descriptor);
    this._registryMap.set(descriptor, addedinteractiveService);
    return addedinteractiveService;
  }
}

const serviceContainer: IServiceContainer = new InternalServiceContainer() as IServiceContainer;
export { serviceContainer as default };
