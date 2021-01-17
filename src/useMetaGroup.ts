import { useState } from 'react';
import { IDataError } from './services/data.error/IDataErrorInteraction';

export interface IDataErrorGroup {
  dataErrors: ReadonlyArray<any>;
  hasErrors: boolean;
}

function useMetaGroup(...args: ReadonlyArray<IDataError>): IDataErrorGroup {
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

export { useMetaGroup as default };
