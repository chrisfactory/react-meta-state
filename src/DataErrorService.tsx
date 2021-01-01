import { RuleBuilderElement } from './Rules';
import { IMetaService } from './serviceBase';

export interface ReadOnlyDataError {
  dataErrors: ReadonlyArray<any>;
  hasErrors: boolean;
}
export type GroupingDataError = ReadOnlyDataError;

export interface IDataErrorService extends ReadOnlyDataError, IMetaService {}

class DataErrorService implements IDataErrorService {
  private readonly _rule: RuleBuilderElement;

  constructor(rule: RuleBuilderElement) {
    this._rule = rule;
  }

  private _bar = false;

  dataErrors: ReadonlyArray<any> = [];

  hasErrors = false;

  Refresh<S>(value: S, selector: string): boolean {
    const ruleResult = this._rule.check(value, selector);
    this.dataErrors = ruleResult.datas;
    this.hasErrors = ruleResult.datas.length > 0;
    return true;
  }
}

export function DataError(rule: RuleBuilderElement): IDataErrorService {
  return new DataErrorService(rule);
}
