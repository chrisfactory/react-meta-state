import { RuleResult } from '../RuleResult';

interface IRuleBuilderService {
  check<S>(value: S, selector: string): RuleResult;
}

type RuleBuilderService = IRuleBuilderService;
export type { RuleBuilderService as default };
