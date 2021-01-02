import {
  RuleBuilderDependencies,
  RuleBuilderElementDep,
} from './Rules.RuleBuilder';

function RuleDependencies<T extends RuleBuilderElementDep>(
  ruleDefinition: T,
): RuleBuilderDependencies<T> {
  return {
    check: (testWith, selector, dataArg) =>
      ruleDefinition(...dataArg).check(testWith, selector),
  };
}
export { RuleDependencies as default };
