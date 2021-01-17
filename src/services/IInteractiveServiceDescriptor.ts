interface IInteractiveContext<S> {
  interactionCallback(
    identifier: string,
    partialInteractiveOject: any,
    action: string,
  );
  readonly value: S | undefined;
  readonly services: ReadonlyArray<InteractiveService>;
}

interface IInteractiveServiceProducer<TInteractiveResult> {
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
type InteractiveServiceFactory<TInteractiveResult> = (
  descriptor: IInteractiveServiceDescriptor<TInteractiveResult>,
) => IInteractiveServiceProducer<TInteractiveResult>;
interface IInteractiveServiceDescriptor<TInteractive> {
  readonly serviceName: string;
  readonly serviceDependencies: any;
  readonly serviceFactory: InteractiveServiceFactory<TInteractive>;
}
type InteractiveService = IInteractiveServiceDescriptor<any>;
type InteractiveServices = ReadonlyArray<InteractiveService>;
export type {
  InteractiveService,
  InteractiveServices,
  IInteractiveServiceDescriptor,
  IInteractiveServiceProducer,
  IInteractiveContext,
  InteractiveServiceFactory,
  InteractiveServiceDependency,
};
