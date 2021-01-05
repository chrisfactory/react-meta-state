import { RuleArgumentDependencyTypes } from '../element/dependencies/RuleArgumentDependencyTypes';
import { RuleBuilderDependencies } from '../element/dependencies/RuleBuilderDependencies';
import RuleBuilderDependenciesService from './RuleBuilderDependenciesService';
import { RuleElement } from '../element/RuleElement';
import { RuleElementDependencies } from '../element/RuleElementDependencies';
import RuleBuilderElementService from './RuleBuilderElementService';
import RuleBuilderService from './RuleBuilderService';

function RuleServiceResolver<T extends RuleElementDependencies>(
  rule: RuleElement | RuleBuilderDependencies<T>,
  dependencies: RuleArgumentDependencyTypes<T> | undefined = undefined,
): RuleBuilderService {
  if (dependencies) {
    const resolvedRule = rule as RuleBuilderDependencies<T>;
    return new RuleBuilderDependenciesService(resolvedRule, dependencies);
  }
  const resolvedRule = rule as RuleElement;
  return new RuleBuilderElementService(resolvedRule);
}
export { RuleServiceResolver as default };
