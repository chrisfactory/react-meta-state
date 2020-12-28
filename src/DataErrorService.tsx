import { MetaService } from './MetaService';

export interface DataErrorServiceHost {
  dataErrors: any[];
  hasError: boolean;
}
export type DataErrorMetaService = MetaService;

export function DefaultDataError(): DataErrorServiceHost {
  return {
    dataErrors: [],
    hasError: false,
  };
}
