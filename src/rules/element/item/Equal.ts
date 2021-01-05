import { RuleElement } from '../RuleElement';
import { Datas } from '../../RuleResult';
import { defaultScope, InScope, Scope } from '../../../Selector';

export function Equal(equalWith: any, failedDatas: Datas): RuleElement;
export function Equal(
  equalWith: any,
  failedDatas: Datas,
  scope: Scope,
): RuleElement;
export function Equal(
  equalWith: any,
  failedDatas: Datas,
  scope: Scope = defaultScope,
): RuleElement {
  return {
    check: (testWith, selector) => {
      if (!InScope(scope, selector)) return { datas: [] };
      if (equalWith !== testWith) return { datas: failedDatas };
      return { datas: [] };
    },
  };
}
