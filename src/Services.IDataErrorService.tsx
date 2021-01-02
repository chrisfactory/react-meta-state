import { IMetaService } from './Services.IMetaService';

export interface IDataErrorService extends IMetaService {
  dataErrors: ReadonlyArray<any>;
  hasErrors: boolean;
}
