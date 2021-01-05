import { RuleResult } from '../RuleResult';
import { Selector } from '../../Selector';

export interface RuleElement {
  check: (testWith: any, selector: Selector) => RuleResult;
}
