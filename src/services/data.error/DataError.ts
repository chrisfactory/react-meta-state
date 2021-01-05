import { IServiceDescriptor } from '../IServiceDescriptor';
import RuleServiceResolver from '../../rules/service/RuleServiceResolver';
import { RuleElementDependencies } from '../../rules/element/RuleElementDependencies';
import { RuleBuilderDependencies } from '../../rules/element/dependencies/RuleBuilderDependencies';
import { RuleArgumentDependencyTypes } from '../../rules/element/dependencies/RuleArgumentDependencyTypes';
import { RuleElement } from '../../rules/element/RuleElement';
import { IDataError } from './IDataError';
import DataErrorServiceResultFactory from './DataErrorServiceResultFactory';
import { IDataErrorInteraction } from './IDataErrorInteraction';

export function DataError<T extends RuleElementDependencies>(
  rule: RuleBuilderDependencies<T>,
  dependencies: RuleArgumentDependencyTypes<T>,
): IServiceDescriptor<IDataError, IDataErrorInteraction>;
export function DataError(
  rule: RuleElement,
): IServiceDescriptor<IDataError, IDataErrorInteraction>;
export function DataError<T extends RuleElementDependencies>(
  rule: RuleElement | RuleBuilderDependencies<T>,
  dependencies: RuleArgumentDependencyTypes<T> | undefined = undefined,
): IServiceDescriptor<IDataError, IDataErrorInteraction> {
  const ruleBuilder = RuleServiceResolver(rule, dependencies);
  const serviceName = 'data.error.producer';
  const serviceResult = new DataErrorServiceResultFactory(
    ruleBuilder,
    serviceName,
  );

  const serviceDes: IServiceDescriptor<IDataError, IDataErrorInteraction> = {
    serviceName,
    resultFactory: serviceResult,
  };
  return serviceDes;
}
