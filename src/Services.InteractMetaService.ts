import { Selector } from './Selector';
import { IMetaService } from './Services.IMetaService';

export interface InteractActions<T> {
  interact(selector: Selector): T;
}
export type Interact<T extends IMetaService> = InteractActions<T> & T;
