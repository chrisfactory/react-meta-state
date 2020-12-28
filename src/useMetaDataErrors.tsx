import { MetaStateContext } from './MetaState';

function useMetaDataErrors(metaStates: MetaStateContext[]) {
  metaStates.forEach((metaState) => {
    metaState.hasError = false;
  });
}

export { useMetaDataErrors as default };
