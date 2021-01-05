import { RuleElement } from '../RuleElement';
import { Datas } from '../../RuleResult';
import { defaultScope, InScope, Scope } from '../../../Selector';

export function ConcatRules(rules: RuleElement[]): RuleElement;
export function ConcatRules(rules: RuleElement[], scope: Scope): RuleElement;
export function ConcatRules(
  rules: RuleElement[],
  scope: Scope = defaultScope,
): RuleElement {
  return {
    check: (testWith, selector) => {
      if (!InScope(scope, selector)) return { datas: [] };
      let datasResult: Datas = [];
      for (let index = 0; index < rules.length; index++) {
        const rule = rules[index];
        const result = rule.check(testWith, selector);
        if (result.datas && result.datas.length > 0) return result;
        datasResult = datasResult.concat(result.datas);
      }
      return { datas: datasResult };
    },
  };
}
