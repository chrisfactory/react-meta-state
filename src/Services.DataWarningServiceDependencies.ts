import { IDataWarningService } from './Services.IDataWarningService';
import {
  RuleArgumentDependencyTypes,
  RuleBuilderDependencies,
  RuleBuilderElementDep,
} from './Rules.RuleBuilder';

class DataWarningServiceDependencies<T extends RuleBuilderElementDep>
  implements IDataWarningService {
  private readonly _rule: RuleBuilderDependencies<T>;

  private readonly _args: RuleArgumentDependencyTypes<T>;

  constructor(
    rule: RuleBuilderDependencies<T>,
    dependencies: RuleArgumentDependencyTypes<T>,
  ) {
    this._rule = rule;
    this._args = dependencies;
  }

  private _bar = false;

  dataWarnings: ReadonlyArray<any> = [];

  hasWarnings = false;

  Refresh<S>(value: S, selector: string): boolean {
    const ruleResult = this._rule.check(value, selector, this._args);
    this.dataWarnings = ruleResult.datas;
    this.hasWarnings = ruleResult.datas.length > 0;
    return true;
  }
}

export { DataWarningServiceDependencies as default };
