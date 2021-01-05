import { RuleElement } from '../RuleElement';
import { Datas } from '../../RuleResult';
import { defaultScope, InScope, Scope } from '../../../Selector';

export function NotEqual(notEqualWith: any, failedDatas: Datas): RuleElement;
export function NotEqual(
  notEqualWith: any,
  failedDatas: Datas,
  scope: Scope,
): RuleElement;
export function NotEqual(
  notEqualWith: any,
  failedDatas: Datas,
  scope: Scope = defaultScope,
): RuleElement {
  return {
    check: (testWith, selector) => {
      if (!InScope(scope, selector)) return { datas: [] };
      if (notEqualWith === testWith) return { datas: failedDatas };
      return { datas: [] };
    },
  };
}
