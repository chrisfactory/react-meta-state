import { RuleElementDependencies } from '../RuleElementDependencies';

export type RuleArgumentDependencyTypes<
  F extends RuleElementDependencies
> = F extends (...args: infer A) => any ? A : never;
