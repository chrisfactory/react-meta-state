import { Selector } from './Selector';

export interface IMetaService {
  /** @internal */
  refresh<S>(value: S, selector: Selector): boolean;
}
