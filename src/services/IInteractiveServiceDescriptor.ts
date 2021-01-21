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
// @ts-ignore-block
interface IInteractiveServiceDescriptor<TInteractive> {
  readonly serviceName: string;
  readonly serviceDependencies: any;
}
type InteractiveService = IInteractiveServiceDescriptor<any>;
type InteractiveServices = ReadonlyArray<InteractiveService>;
export type {
  InteractiveService,
  InteractiveServices,
  IInteractiveServiceDescriptor,
  IInteractiveServiceProducer,
  IInteractiveContext,
};
