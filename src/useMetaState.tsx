import React, { Dispatch, SetStateAction } from 'react';

const creator = function useMetaStateCreator() {
  function useMetaState<S = undefined>(
    initialState: S | (() => S) | undefined = undefined,
  ): [S | undefined, Dispatch<SetStateAction<S>>] {
    const [metaState, setMetaState] = React.useState(initialState);
    return [metaState, setMetaState];
  }

  return { useMetaState };
};
export { creator as default };
