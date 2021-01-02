import DataErrorService from './Services.DataErrorService';
import DataErrorServiceDependencies from './Services.DataErrorServiceDependencies';
import { IDataErrorService } from './Services.IDataErrorService';
import {
  RuleArgumentDependencyTypes,
  RuleBuilderDependencies,
  RuleBuilderElement,
  RuleBuilderElementDep,
} from './Rules.RuleBuilder';

export function DataError<T extends RuleBuilderElementDep>(
  rule: RuleBuilderDependencies<T>,
  dependencies: RuleArgumentDependencyTypes<T>,
): IDataErrorService;
export function DataError(rule: RuleBuilderElement): IDataErrorService;
export function DataError<T extends RuleBuilderElementDep>(
  rule: RuleBuilderElement | RuleBuilderDependencies<T>,
  dependencies: RuleArgumentDependencyTypes<T> | undefined = undefined,
): IDataErrorService {
  if (dependencies) {
    const resolvedRule = rule as RuleBuilderDependencies<T>;
    return new DataErrorServiceDependencies(
      resolvedRule,
      dependencies,
    ) as IDataErrorService;
  }
  const resolvedRule = rule as RuleBuilderElement;
  return new DataErrorService(resolvedRule) as IDataErrorService;
}
