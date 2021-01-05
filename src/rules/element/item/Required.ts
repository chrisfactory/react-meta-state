import { RuleElement } from '../RuleElement';
import { Datas } from '../../RuleResult';
import { defaultScope, InScope, Scope } from '../../../Selector';

export function Required(failedDatas: Datas): RuleElement;
export function Required(failedDatas: Datas, scope: Scope): RuleElement;
export function Required(
  failedDatas: Datas,
  scope: Scope = defaultScope,
): RuleElement {
  return {
    check: (testWith, selector) => {
      if (!InScope(scope, selector)) return { datas: [] };
      if (!testWith || testWith === '') return { datas: failedDatas };
      return { datas: [] };
    },
  };
}
