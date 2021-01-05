import { RuleElement } from '../element/RuleElement';
import { RuleResult } from '../RuleResult';
import RuleBuilderService from './RuleBuilderService';

class RuleBuilderElementService implements RuleBuilderService {
  private readonly _rule: RuleElement;

  constructor(rule: RuleElement) {
    this._rule = rule;
  }

  check<S>(value: S, selector: string): RuleResult {
    return this._rule.check(value, selector);
  }
}
export { RuleBuilderElementService as default };
