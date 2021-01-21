import { IInteractiveServiceProducer } from './IInteractiveServiceDescriptor';

interface IServiceContainer {
  GetInteractiveService(name: string): IInteractiveServiceProducer<any>;
  AddInteractiveService(name: string, insance: any);
}
class InternalServiceContainer implements IServiceContainer {
  protected _registryMap = new Map<string, any>();

  GetInteractiveService(name: string): IInteractiveServiceProducer<any> {
    const interactiveService = this._registryMap.get(name);
    if (interactiveService) {
      return interactiveService;
    }
    throw new Error(`service ${name} not found`);
  }

  AddInteractiveService(name: string, insance: any) {
    this._registryMap.set(name, insance);
  }
}

const serviceContainer: IServiceContainer = new InternalServiceContainer() as IServiceContainer;
export { serviceContainer as default };
