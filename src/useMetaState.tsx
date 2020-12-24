import { Dispatch, SetStateAction, useState } from 'react';

export default function useMetaState<S = undefined>(
  initialState: S | (() => S) | undefined = undefined,
): [S | undefined, Dispatch<SetStateAction<S>>] {
  const [errorVBox, seterrorVBox] = useState(initialState);

  return [errorVBox, seterrorVBox];
}
