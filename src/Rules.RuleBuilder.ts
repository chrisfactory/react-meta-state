import { RuleResult } from './Rules.RuleResult';
import { Selector } from './Selector';

export type RuleBuilderElementDep = (...args: any[]) => RuleBuilderElement;

export type RuleArgumentDependencyTypes<
  F extends RuleBuilderElementDep
> = F extends (...args: infer A) => any ? A : never;

export interface RuleBuilderDependencies<T extends RuleBuilderElementDep> {
  check: (
    testWith: any,
    selector: Selector,
    dependencies: RuleArgumentDependencyTypes<T>,
  ) => RuleResult;
}
export interface RuleBuilderElement {
  check: (testWith: any, selector: Selector) => RuleResult;
}
