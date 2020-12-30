import { useState } from 'react';
import { DefaultDataError, GroupingDataError } from './DataErrorService';
import { MetaStateBox, MetaStateContext } from './MetaState';

export type MetaStateList = ReadonlyArray<MetaStateContext>;

function OnValueChanging<S>(value: S, box: MetaStateBox<S>) {
  box.dataErrors = [value];
}
function useMetaDataErrors(metaStates: MetaStateList): GroupingDataError {
  const [dataErrorGroup] = useState<GroupingDataError>({
    ...DefaultDataError(),
  });
  metaStates.forEach((metaState) => {
    metaState.addService({ name: 'l', OnValueChanging });
    // metaState.services = [{name:"l", OnValueChanging:OnValueChanging}]
  });

  return dataErrorGroup;
}

export { useMetaDataErrors as default };
