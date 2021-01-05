import { RuleElement } from '../RuleElement';
import { defaultScope, InScope, Scope } from '../../../Selector';

export function StepRules(rules: RuleElement[]): RuleElement;
export function StepRules(rules: RuleElement[], scope: Scope): RuleElement;
export function StepRules(
  rules: RuleElement[],
  scope: Scope = defaultScope,
): RuleElement {
  return {
    check: (testWith, selector) => {
      if (!InScope(scope, selector)) return { datas: [] };
      for (let index = 0; index < rules.length; index++) {
        const rule = rules[index];
        const result = rule.check(testWith, selector);
        if (result.datas && result.datas.length > 0) return result;
      }
      return { datas: [] };
    },
  };
}
