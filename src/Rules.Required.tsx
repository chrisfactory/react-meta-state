import { RuleBuilderElement } from './Rules.RuleBuilder';
import { Datas } from './Rules.RuleResult';
import { defaultScope, InScope, Scope } from './Selector';

export function Required(failedDatas: Datas): RuleBuilderElement;
export function Required(failedDatas: Datas, scope: Scope): RuleBuilderElement;
export function Required(
  failedDatas: Datas,
  scope: Scope = defaultScope,
): RuleBuilderElement {
  return {
    check: (testWith, selector) => {
      if (!InScope(scope, selector)) return { datas: [] };
      if (!testWith || testWith === '') return { datas: failedDatas };
      return { datas: [] };
    },
  };
}
