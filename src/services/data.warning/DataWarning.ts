import { IServiceDescriptor } from '../IServiceDescriptor';
import RuleServiceResolver from '../../rules/service/RuleServiceResolver';
import { RuleElementDependencies } from '../../rules/element/RuleElementDependencies';
import { RuleBuilderDependencies } from '../../rules/element/dependencies/RuleBuilderDependencies';
import { RuleArgumentDependencyTypes } from '../../rules/element/dependencies/RuleArgumentDependencyTypes';
import { RuleElement } from '../../rules/element/RuleElement';
import { IDataWarning } from './IDataWarning';
import DataWarningService from './DataWarningService';
import { IDataWarningInteraction } from './IDataWarningInteraction';

export function DataWarning<T extends RuleElementDependencies>(
  rule: RuleBuilderDependencies<T>,
  dependencies: RuleArgumentDependencyTypes<T>,
): IServiceDescriptor<IDataWarning, IDataWarningInteraction>;
export function DataWarning(
  rule: RuleElement,
): IServiceDescriptor<IDataWarning, IDataWarningInteraction>;
export function DataWarning<T extends RuleElementDependencies>(
  rule: RuleElement | RuleBuilderDependencies<T>,
  dependencies: RuleArgumentDependencyTypes<T> | undefined = undefined,
): IServiceDescriptor<IDataWarning, IDataWarningInteraction> {
  const ruleBuilder = RuleServiceResolver(rule, dependencies);
  const serviceName = 'data.Warning.producer';
  const service = new DataWarningService(ruleBuilder, serviceName);

  const serviceDes: IServiceDescriptor<
    IDataWarning,
    IDataWarningInteraction
  > = {
    serviceName,
    dataProducer: service,
  };
  return serviceDes;
}
