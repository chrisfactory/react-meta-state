interface IInteractiveService {
  interact(): any;
}
interface IInteractiveContext<S> {
  interactionCallback(identifier: string, partialInteractiveOject: any);
  readonly value: S | undefined;
  readonly services: ReadonlyArray<InteractiveService>;
}

interface IInteractiveServiceProducer<
  TInteractiveResult extends IInteractiveService
> {
  readonly identifier: string;
  getPartialInteractiveOject<S>(
    services: ReadonlyArray<InteractiveService>,
    value: S,
    scope: string,
  ): any;
  getInteractiveOject<S>(
    partialInteractiveOject: any,
    getContext: () => IInteractiveContext<S>,
  ): TInteractiveResult;
}

type InteractiveServiceDependency = () => any;
type InteractiveServiceFactory<
  TInteractiveResult extends IInteractiveService
> = (
  descriptor: IInteractiveServiceDescriptor<TInteractiveResult>,
) => IInteractiveServiceProducer<TInteractiveResult>;
interface IInteractiveServiceDescriptor<
  TInteractive extends IInteractiveService
> {
  readonly serviceName: string;
  readonly serviceDependencies: InteractiveServiceDependency;
  readonly serviceFactory: InteractiveServiceFactory<TInteractive>;
}
type InteractiveService = IInteractiveServiceDescriptor<any>;

export type {
  InteractiveService,
  IInteractiveServiceDescriptor,
  IInteractiveServiceProducer,
  IInteractiveContext,
  IInteractiveService,
  InteractiveServiceFactory,
  InteractiveServiceDependency,
};
