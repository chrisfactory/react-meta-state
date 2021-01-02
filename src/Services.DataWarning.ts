import DataWarningService from './Services.DataWarningService';
import DataWarningServiceDependencies from './Services.DataWarningServiceDependencies';
import { IDataWarningService } from './Services.IDataWarningService';
import {
  RuleArgumentDependencyTypes,
  RuleBuilderDependencies,
  RuleBuilderElement,
  RuleBuilderElementDep,
} from './Rules.RuleBuilder';

export function DataWarning<T extends RuleBuilderElementDep>(
  rule: RuleBuilderDependencies<T>,
  dependencies: RuleArgumentDependencyTypes<T>,
): IDataWarningService;
export function DataWarning(rule: RuleBuilderElement): IDataWarningService;
export function DataWarning<T extends RuleBuilderElementDep>(
  rule: RuleBuilderElement | RuleBuilderDependencies<T>,
  dependencies: RuleArgumentDependencyTypes<T> | undefined = undefined,
): IDataWarningService {
  if (dependencies) {
    const resolvedRule = rule as RuleBuilderDependencies<T>;
    return new DataWarningServiceDependencies(
      resolvedRule,
      dependencies,
    ) as IDataWarningService;
  }
  const resolvedRule = rule as RuleBuilderElement;
  return new DataWarningService(resolvedRule) as IDataWarningService;
}
