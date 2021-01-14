import { IInteractiveService } from '../IInteractiveServiceDescriptor';

export interface IDataInformation {
  readonly hasInformations: boolean;
  readonly dataInformations: any[];
}
export interface IDataInformationInteraction
  extends IDataInformation,
    IInteractiveService {
  CheckInformations(): IDataInformation;
  CheckInformations(scope: string): IDataInformation;
}
