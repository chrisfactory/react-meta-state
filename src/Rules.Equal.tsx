import { RuleBuilderElement } from './Rules.RuleBuilder';
import { Datas } from './Rules.RuleResult';
import { defaultScope, InScope, Scope } from './Selector';

export function Equal(equalWith: any, failedDatas: Datas): RuleBuilderElement;
export function Equal(
  equalWith: any,
  failedDatas: Datas,
  scope: Scope,
): RuleBuilderElement;
export function Equal(
  equalWith: any,
  failedDatas: Datas,
  scope: Scope = defaultScope,
): RuleBuilderElement {
  return {
    check: (testWith, selector) => {
      if (!InScope(scope, selector)) return { datas: [] };
      if (equalWith !== testWith) return { datas: failedDatas };
      return { datas: [] };
    },
  };
}
