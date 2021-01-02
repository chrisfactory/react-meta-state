import { useState } from 'react';
import { IDataErrorService } from './Services.IDataErrorService';
import { Interact } from './Services.InteractMetaService';

function useDataErrorGroup(
  ...args: ReadonlyArray<Interact<IDataErrorService>>
) {
  const [services, SetServices] = useState(args);

  return [services, SetServices];
}

export { useDataErrorGroup as default };
