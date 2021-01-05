import { RuleElementDependencies } from '../RuleElementDependencies';
import { RuleBuilderDependencies } from './RuleBuilderDependencies';

function RuleDependencies<T extends RuleElementDependencies>(
  ruleDefinition: T,
): RuleBuilderDependencies<T> {
  return {
    check: (testWith, selector, dataArg) =>
      ruleDefinition(...dataArg).check(testWith, selector),
  };
}
export { RuleDependencies as default };
