import { DataErrorServiceHost } from './DataErrorService';
import { StoreMetaService } from './MetaService';

export interface MetaStateContext extends DataErrorServiceHost {
  /** @internal */
  services: StoreMetaService;
}
export type MetaState<S = undefined> = MetaStateContext & ((value: S) => void);
