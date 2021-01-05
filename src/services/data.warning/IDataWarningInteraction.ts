import { IServiceInteraction } from '../IServiceDescriptor';

export interface IDataWarningInteraction extends IServiceInteraction {
  CheckWarnings();
  CheckWarnings(scope: string);
}
