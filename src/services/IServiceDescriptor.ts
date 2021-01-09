interface IServiceInteraction {
  interact(): any;
}
interface IInteractData<S> {
  callback(result: any);
  readonly value: S | undefined;
  readonly services: ReadonlyArray<MetaService>;
}
interface IServiceInteractionFactory<
  TServiceInteraction extends IServiceInteraction
> {
  getInteraction<S>(getContext: () => IInteractData<S>): TServiceInteraction;
}

interface IServiceDescriptor<
  TServiceResult,
  TInteract extends IServiceInteraction
> {
  readonly serviceName: string;
  readonly dataProducer: IDataProducerService<TServiceResult> &
    IServiceInteractionFactory<TInteract>;
}
type MetaService = IServiceDescriptor<any, any>;
interface IDataProducerService<TResult> {
  readonly parentName: string;
  readonly factoryName: string;
  readonly identifier: string;
  getData<S>(current: TResult, value: S, scope: string): TResult;
}

export {
  MetaService,
  IServiceDescriptor,
  IServiceInteraction,
  IInteractData,
  IServiceInteractionFactory,
  IDataProducerService,
};
