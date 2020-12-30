export function DefaultDataError(): DataError {
  return {
    dataErrors: [],
    hasError: false,
  };
}
export interface DataError {
  dataErrors: ReadonlyArray<any>;
  hasError: boolean;
}
export interface ReadOnlyDataError {
  readonly dataErrors: ReadonlyArray<any>;
  readonly hasError: boolean;
}
export type GroupingDataError = ReadOnlyDataError;
