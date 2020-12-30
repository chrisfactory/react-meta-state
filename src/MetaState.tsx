import { ReadOnlyDataError, DataError } from './DataErrorService';

export interface MetaService {
  name: string;
  OnValueChanging<S>(value: S, box: MetaStateBox<S>);
}

export type StoreMetaService = Array<MetaService>;

export interface MetaStateContext {
  /** @internal */
  addService(service: MetaService);
}
export type MetaState<S> = MetaStateContext &
  ReadOnlyDataError &
  ((value: S) => void);

export interface MetaStateBox<S> extends DataError {
  Value: S;
  services: StoreMetaService;
}
