import { RuleArgumentDependencyTypes } from './RuleArgumentDependencyTypes';
import { RuleElementDependencies } from '../RuleElementDependencies';
import { RuleResult } from '../../RuleResult';
import { Selector } from '../../../Selector';

export interface RuleBuilderDependencies<T extends RuleElementDependencies> {
  check: (
    testWith: any,
    selector: Selector,
    dependencies: RuleArgumentDependencyTypes<T>,
  ) => RuleResult;
}
