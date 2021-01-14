export interface IDataError {
  readonly hasErrors: boolean;
  readonly dataErrors: any[];
}
export interface IDataErrorInteraction extends IDataError {
  checkErrors(): IDataError;
  checkErrors(scope: string): IDataError;
}
