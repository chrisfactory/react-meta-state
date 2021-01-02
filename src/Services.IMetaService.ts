import { Selector } from './Selector';

export interface IMetaService {
  Refresh<S>(value: S, selector: Selector): boolean;
}
