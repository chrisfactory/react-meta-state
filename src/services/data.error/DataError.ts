import RuleServiceResolver from '../../rules/service/RuleServiceResolver';
import { RuleElementDependencies } from '../../rules/element/RuleElementDependencies';
import { RuleBuilderDependencies } from '../../rules/element/dependencies/RuleBuilderDependencies';
import { RuleArgumentDependencyTypes } from '../../rules/element/dependencies/RuleArgumentDependencyTypes';
import { RuleElement } from '../../rules/element/RuleElement';
import DataErrorService from './DataErrorService';
import { IDataErrorInteraction } from './IDataErrorInteraction';
import { IInteractiveServiceDescriptor } from '../IInteractiveServiceDescriptor';

export function DataError<T extends RuleElementDependencies>(
  rule: RuleBuilderDependencies<T>,
  dependencies: RuleArgumentDependencyTypes<T>,
): IInteractiveServiceDescriptor<IDataErrorInteraction>;
export function DataError(
  rule: RuleElement,
): IInteractiveServiceDescriptor<IDataErrorInteraction>;
export function DataError<T extends RuleElementDependencies>(
  rule: RuleElement | RuleBuilderDependencies<T>,
  dependencies: RuleArgumentDependencyTypes<T> | undefined = undefined,
): IInteractiveServiceDescriptor<IDataErrorInteraction> {
  const ruleBuilder = RuleServiceResolver(rule, dependencies);
  const serviceDescription: IInteractiveServiceDescriptor<IDataErrorInteraction> = {
    serviceName: 'data.error.producer',
    serviceDependencies: () => ruleBuilder,
    serviceFactory: (des) => new DataErrorService(des),
  };
  return serviceDescription;
}
