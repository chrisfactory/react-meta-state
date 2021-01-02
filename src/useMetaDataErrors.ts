import { useState } from 'react';
import { IDataErrorService } from './Services.IDataErrorService';

export type DataErrorServices = ReadonlyArray<IDataErrorService>;

function useMetaDataErrors(metaStates: DataErrorServices) {
  // const [dataErrorGroup] = useState<GroupingDataError>({
  //   hasErrors: false,
  //   dataErrors: [],
  // });
  const [services, SetServices] = useState(metaStates);

  return [services, SetServices];
}

export { useMetaDataErrors as default };
