import { RuleBuilderElement } from './Rules.RuleBuilder';
import { defaultScope, InScope, Scope } from './Selector';

export function StepRules(rules: RuleBuilderElement[]): RuleBuilderElement;
export function StepRules(
  rules: RuleBuilderElement[],
  scope: Scope,
): RuleBuilderElement;
export function StepRules(
  rules: RuleBuilderElement[],
  scope: Scope = defaultScope,
): RuleBuilderElement {
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
