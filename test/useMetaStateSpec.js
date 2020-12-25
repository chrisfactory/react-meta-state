/* eslint no-new-func: 0 */
import { renderHook } from '@testing-library/react-hooks';
import useMetaState from '../src/index';

describe('useMetaState', () => {
  it('Should be set the default.', () => {
    const { result } = renderHook(() => useMetaState());
    expect(result.current[0]).to.equal(undefined);
  });
  it('Should be set the default with simple type.', () => {
    ['string', 4, true, undefined].forEach((element) => {
      const { result } = renderHook(() => useMetaState(element));
      expect(result.current[0]).to.equal(element);
    });
  });
  it('Should be set the default with simple action.', () => {
    ['string', 4, true, undefined].forEach((element) => {
      const { result } = renderHook(() => useMetaState(() => element));
      expect(result.current[0]).to.equal(element);
    });
  });
});
