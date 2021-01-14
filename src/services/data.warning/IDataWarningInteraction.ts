export interface IDataWarning {
  readonly hasWarnings: boolean;
  readonly dataWarnings: any[];
}
export interface IDataWarningInteraction extends IDataWarning {
  checkWarnings(): IDataWarning;
  checkWarnings(scope: string): IDataWarning;
}
