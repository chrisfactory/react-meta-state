import React, { Dispatch, SetStateAction } from 'react';

function useMetaState<S = undefined>(
  initialState: S | (() => S) | undefined = undefined,
): [S | undefined, Dispatch<SetStateAction<S>>] {
  const [metaState, setMetaState] = React.useState(initialState);

  return [metaState, setMetaState];
}
export default useMetaState;
