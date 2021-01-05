import { useState } from 'react';
import { IDataError } from './services/data.error/IDataError';

export interface IDataErrorGroup {
  dataErrors: ReadonlyArray<any>;
  hasErrors: boolean;
}

function useDataErrorGroup(
  ...args: ReadonlyArray<IDataError>
): IDataErrorGroup {
  const [services, SetServices] = useState(args);

  return {
    // interact :(s)=>{
    //   // args.forEach((service) => {
    //   //   service.interact(s);
    //   // });
    //   return {dataErrors : [],hasErrors : false};
    // },
    dataErrors: [services, SetServices],
    hasErrors: false,
  };
}

export { useDataErrorGroup as default };
