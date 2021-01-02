import { IDataWarningService } from './Services.IDataWarningService';
import { RuleBuilderElement } from './Rules.RuleBuilder';

class DataWarningService implements IDataWarningService {
  private readonly _rule: RuleBuilderElement;

  constructor(rule: RuleBuilderElement) {
    this._rule = rule;
  }

  private _bar = false;

  dataWarnings: ReadonlyArray<any> = [];

  hasWarnings = false;

  refresh<S>(value: S, selector: string): boolean {
    const ruleResult = this._rule.check(value, selector);
    this.dataWarnings = ruleResult.datas;
    this.hasWarnings = ruleResult.datas.length > 0;
    return true;
  }
}
export { DataWarningService as default };
