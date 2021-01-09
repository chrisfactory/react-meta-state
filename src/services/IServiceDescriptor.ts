interface IServiceInteraction {
  interact(): any;
}
interface IInteractData<S> {
  callback(result: any);
  readonly value: S | undefined;
  readonly services: ReadonlyArray<MetaService>;
}
interface IServiceDescriptor<
  TServiceResult,
  TInteract extends IServiceInteraction
> {
  readonly serviceName: string;
  readonly dataProducer: IDataProducerService<TServiceResult, TInteract>;
}
type MetaService = IServiceDescriptor<any, any>;
interface IDataProducerService<
  TResult,
  TServiceInteraction extends IServiceInteraction
> {
  readonly parentName: string;
  readonly factoryName: string;
  readonly identifier: string;
  getData<S>(current: TResult, value: S, scope: string): TResult;
  getInteraction<S>(getContext: () => IInteractData<S>): TServiceInteraction;
}

export {
  MetaService,
  IServiceDescriptor,
  IServiceInteraction,
  IInteractData,
  IDataProducerService,
};
