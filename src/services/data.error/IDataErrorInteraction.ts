import { IInteractiveService } from '../IInteractiveServiceDescriptor';

export interface IDataError {
  readonly hasErrors: boolean;
  readonly dataErrors: any[];
}
export interface IDataErrorInteraction extends IDataError, IInteractiveService {
  CheckErrors(): IDataError;
  CheckErrors(scope: string): IDataError;
}
