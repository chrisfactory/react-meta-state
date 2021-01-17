import RuleServiceResolver from '../../rules/service/RuleServiceResolver';
import { RuleElementDependencies } from '../../rules/element/RuleElementDependencies';
import { RuleBuilderDependencies } from '../../rules/element/dependencies/RuleBuilderDependencies';
import { RuleArgumentDependencyTypes } from '../../rules/element/dependencies/RuleArgumentDependencyTypes';
import { RuleElement } from '../../rules/element/RuleElement';
import DataInformationService from './DataInformationService';
import { IDataInformationInteraction } from './IDataInformationInteraction';
import { IInteractiveServiceDescriptor } from '../IInteractiveServiceDescriptor';

export function DataInformation<T extends RuleElementDependencies>(
  rule: RuleBuilderDependencies<T>,
  dependencies: RuleArgumentDependencyTypes<T>,
): IInteractiveServiceDescriptor<IDataInformationInteraction>;
export function DataInformation(
  rule: RuleElement,
): IInteractiveServiceDescriptor<IDataInformationInteraction>;
export function DataInformation<T extends RuleElementDependencies>(
  rule: RuleElement | RuleBuilderDependencies<T>,
  dependencies: RuleArgumentDependencyTypes<T> | undefined = undefined,
): IInteractiveServiceDescriptor<IDataInformationInteraction> {
  const serviceDescription: IInteractiveServiceDescriptor<IDataInformationInteraction> = {
    serviceName: 'data.information.producer',
    serviceDependencies: RuleServiceResolver(rule, dependencies),
    serviceFactory: (des) => new DataInformationService(des),
  };
  return serviceDescription;
}
