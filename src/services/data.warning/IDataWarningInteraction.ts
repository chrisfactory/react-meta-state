import { IInteractiveService } from '../IInteractiveServiceDescriptor';

export interface IDataWarning {
  readonly hasWarnings: boolean;
  readonly dataWarnings: any[];
}
export interface IDataWarningInteraction
  extends IDataWarning,
    IInteractiveService {
  CheckWarnings(): IDataWarning;
  CheckWarnings(scope: string): IDataWarning;
}
