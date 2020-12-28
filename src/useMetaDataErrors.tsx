import { MetaStateContext } from './useMetaState';

function useMetaDataErrors(data: MetaStateContext) {
  return data.services;
}

export { useMetaDataErrors as default };
