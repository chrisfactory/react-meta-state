import { RuleArgumentDependencyTypes } from '../element/dependencies/RuleArgumentDependencyTypes';
import { RuleBuilderDependencies } from '../element/dependencies/RuleBuilderDependencies';
import { RuleElementDependencies } from '../element/RuleElementDependencies';
import RuleBuilderService from './RuleBuilderService';
import { RuleResult } from '../RuleResult';

class RuleBuilderDependenciesService<T extends RuleElementDependencies>
  implements RuleBuilderService {
  private readonly _rule: RuleBuilderDependencies<T>;

  private readonly _args: RuleArgumentDependencyTypes<T>;

  constructor(
    rule: RuleBuilderDependencies<T>,
    dependencies: RuleArgumentDependencyTypes<T>,
  ) {
    this._rule = rule;
    this._args = dependencies;
  }

  check<S>(value: S, selector: string): RuleResult {
    return this._rule.check(value, selector, this._args);
  }
}
export { RuleBuilderDependenciesService as default };
