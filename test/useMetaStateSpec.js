/* eslint no-new-func: 0 */
import { renderHook, act } from '@testing-library/react-hooks';
import { useMetaState, useDataErrorGroup } from '../src/index';

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
  it('Should be set the default with action.', () => {
    ['string', 4, true, undefined].forEach((element) => {
      const { result } = renderHook(() => useMetaState(() => element));
      expect(result.current[0]).to.equal(element);
    });
  });

  it('Should be set value.', () => {
    const { result } = renderHook(() => useMetaState());
    ['string', 4, true, undefined].forEach((element) => {
      act(() => {
        result.current[1](element);
      });
      expect(result.current[0]).to.equal(element);
    });
  });

  it('Should be get services.', () => {
    const { result } = renderHook(() => {
      const [getV, setV] = useMetaState();
      useDataErrorGroup([setV]);
      return [getV, setV];
    });

    ['string', 4, true, undefined].forEach((element) => {
      act(() => {
        result.current[1](element);
      });
      expect(result.current[0]).to.equal(element);
    });
  });
});
