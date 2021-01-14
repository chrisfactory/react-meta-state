export interface IDataInformation {
  readonly hasInformations: boolean;
  readonly dataInformations: any[];
}
export interface IDataInformationInteraction extends IDataInformation {
  checkInformations(): IDataInformation;
  checkInformations(scope: string): IDataInformation;
}
