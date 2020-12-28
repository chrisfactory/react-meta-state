import { MetaStateContext } from '../useMetaState/useMetaState';

function useMetaDataErrors(data: MetaStateContext) {
  return data.services;
}

export { useMetaDataErrors as default };
