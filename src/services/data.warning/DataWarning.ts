import RuleServiceResolver from '../../rules/service/RuleServiceResolver';
import { RuleElementDependencies } from '../../rules/element/RuleElementDependencies';
import { RuleBuilderDependencies } from '../../rules/element/dependencies/RuleBuilderDependencies';
import { RuleArgumentDependencyTypes } from '../../rules/element/dependencies/RuleArgumentDependencyTypes';
import { RuleElement } from '../../rules/element/RuleElement';
import {
  IDataWarning,
  IDataWarningInteraction,
} from './IDataWarningInteraction';
import {
  IInteractiveContext,
  IInteractiveServiceDescriptor,
  IInteractiveServiceProducer,
  InteractiveService,
} from '../IInteractiveServiceDescriptor';
import interactiveProducer from '../../decorator/InteractiveProducer';
import RuleBuilderService from '../../rules/service/RuleBuilderService';

const DATA_WARNING_SERVICE_NAME = 'data.warning.producer';

@interactiveProducer(DATA_WARNING_SERVICE_NAME)
export class DataWarningService
  implements IInteractiveServiceProducer<IDataWarningInteraction> {
  readonly identifier: string = '';

  readonly default: IDataWarning = {
    hasWarnings: false,
    dataWarnings: [],
  };

  getPartialInteractiveOject<S>(
    services: readonly InteractiveService[],
    value: S,
    scope: string,
  ): IDataWarning {
    let dataResult: any[] = [];
    services.forEach((inService) => {
      if (inService.serviceName === this.identifier) {
        const rule = inService.serviceDependencies as RuleBuilderService;
        if (rule) {
          const ruleResult = rule.check<S>(value, scope);
          if (ruleResult.datas.length > 0) {
            dataResult = dataResult.concat(ruleResult.datas);
          }
        }
      }
    });
    return { dataWarnings: dataResult, hasWarnings: dataResult.length > 0 };
  }

  getInteractiveOject<S>(
    partialInteractiveOject: any,
    getContext: () => IInteractiveContext<S>,
  ): IDataWarningInteraction {
    const interactor = (s: string | undefined = undefined): IDataWarning =>
      this.innerCheckWarnings<S>(s, getContext);
    const interactive: IDataWarningInteraction = {
      ...partialInteractiveOject,
      checkWarnings: interactor,
    };
    return interactive;
  }

  innerCheckWarnings<S>(
    scope = '*',
    getContext: () => IInteractiveContext<S>,
  ): IDataWarning {
    const context = getContext();
    const result = this.getPartialInteractiveOject(
      context.services,
      context.value,
      scope,
    );
    context.interactionCallback(this.identifier, result, scope);
    return result;
  }
}

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
    serviceName: DATA_WARNING_SERVICE_NAME,
    serviceDependencies: RuleServiceResolver(rule, dependencies),
  };
  return serviceDescription;
}
