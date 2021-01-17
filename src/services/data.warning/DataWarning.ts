import RuleServiceResolver from '../../rules/service/RuleServiceResolver';
import { RuleElementDependencies } from '../../rules/element/RuleElementDependencies';
import { RuleBuilderDependencies } from '../../rules/element/dependencies/RuleBuilderDependencies';
import { RuleArgumentDependencyTypes } from '../../rules/element/dependencies/RuleArgumentDependencyTypes';
import { RuleElement } from '../../rules/element/RuleElement';
import DataWarningService from './DataWarningService';
import { IDataWarningInteraction } from './IDataWarningInteraction';
import { IInteractiveServiceDescriptor } from '../IInteractiveServiceDescriptor';

export function DataWarning<T extends RuleElementDependencies>(
  rule: RuleBuilderDependencies<T>,
  dependencies: RuleArgumentDependencyTypes<T>,
): IInteractiveServiceDescriptor<IDataWarningInteraction>;
export function DataWarning(
  rule: RuleElement,
): IInteractiveServiceDescriptor<IDataWarningInteraction>;
export function DataWarning<T extends RuleElementDependencies>(
  rule: RuleElement | RuleBuilderDependencies<T>,
  dependencies: RuleArgumentDependencyTypes<T> | undefined = undefined,
): IInteractiveServiceDescriptor<IDataWarningInteraction> {
  const serviceDescription: IInteractiveServiceDescriptor<IDataWarningInteraction> = {
    serviceName: 'data.warning.producer',
    serviceDependencies: RuleServiceResolver(rule, dependencies),
    serviceFactory: (des) => new DataWarningService(des),
  };
  return serviceDescription;
}
