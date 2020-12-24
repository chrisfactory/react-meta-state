import { Dispatch, SetStateAction, useState } from 'react';

function useStateWithErrors<S = undefined>(
  initialState: S | (() => S) | undefined = undefined,
): [S | undefined, Dispatch<SetStateAction<S>>] {
  const [errorVBox, seterrorVBox] = useState(initialState);

  return [errorVBox, seterrorVBox];
}
export default useStateWithErrors;
