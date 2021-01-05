import { IServiceInteraction } from '../IServiceDescriptor';
import { IDataError } from './IDataError';

export interface IDataErrorInteraction extends IServiceInteraction {
  CheckErrors(): IDataError;
  CheckErrors(scope: string): IDataError;
}
