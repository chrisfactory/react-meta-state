import React from 'react';

function useMetaState<S = undefined>(
  initialState: S | (() => S) | undefined = undefined,
): [S | undefined, (value: S) => void] {
  const [metaState, setMetaState] = React.useState(initialState);
  return [metaState, setMetaState];
}
export { useMetaState as default };
