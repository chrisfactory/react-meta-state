import { IDataErrorService } from './Services.IDataErrorService';
import { RuleBuilderElement } from './Rules.RuleBuilder';

class DataErrorService implements IDataErrorService {
  private readonly _rule: RuleBuilderElement;

  constructor(rule: RuleBuilderElement) {
    this._rule = rule;
  }

  private _bar = false;

  dataErrors: ReadonlyArray<any> = [];

  hasErrors = false;

  refresh<S>(value: S, selector: string): boolean {
    const ruleResult = this._rule.check(value, selector);
    this.dataErrors = ruleResult.datas;
    this.hasErrors = ruleResult.datas.length > 0;
    return true;
  }
}
export { DataErrorService as default };
