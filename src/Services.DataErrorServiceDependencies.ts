import { IDataErrorService } from './Services.IDataErrorService';
import {
  RuleArgumentDependencyTypes,
  RuleBuilderDependencies,
  RuleBuilderElementDep,
} from './Rules.RuleBuilder';

class DataErrorServiceDependencies<T extends RuleBuilderElementDep>
  implements IDataErrorService {
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

  dataErrors: ReadonlyArray<any> = [];

  hasErrors = false;

  Refresh<S>(value: S, selector: string): boolean {
    const ruleResult = this._rule.check(value, selector, this._args);
    this.dataErrors = ruleResult.datas;
    this.hasErrors = ruleResult.datas.length > 0;
    return true;
  }
}

export { DataErrorServiceDependencies as default };
