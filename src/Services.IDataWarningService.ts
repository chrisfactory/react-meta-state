import { IMetaService } from './Services.IMetaService';

export interface IDataWarningService extends IMetaService {
  dataWarnings: ReadonlyArray<any>;
  hasWarnings: boolean;
}
