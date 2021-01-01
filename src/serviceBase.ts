import { Selector } from './Rules';

export interface IMetaService {
  Refresh<S>(value: S, selector: Selector): boolean;
}
