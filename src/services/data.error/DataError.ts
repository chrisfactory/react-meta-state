import RuleServiceResolver from '../../rules/service/RuleServiceResolver';
import { RuleElementDependencies } from '../../rules/element/RuleElementDependencies';
import { RuleBuilderDependencies } from '../../rules/element/dependencies/RuleBuilderDependencies';
import { RuleArgumentDependencyTypes } from '../../rules/element/dependencies/RuleArgumentDependencyTypes';
import { RuleElement } from '../../rules/element/RuleElement';
import { IDataError, IDataErrorInteraction } from './IDataErrorInteraction';
import {
  IInteractiveContext,
  IInteractiveServiceDescriptor,
  IInteractiveServiceProducer,
  InteractiveService,
} from '../IInteractiveServiceDescriptor';
import interactiveProducer from '../../decorator/InteractiveProducer';
import RuleBuilderService from '../../rules/service/RuleBuilderService';

const DATA_ERROR_SERVICE_NAME = 'data.information.producer';

@interactiveProducer(DATA_ERROR_SERVICE_NAME)
export class DataErrorService
  implements IInteractiveServiceProducer<IDataErrorInteraction> {
  readonly identifier: string = '';

  readonly default: IDataError = {
    hasErrors: false,
    dataErrors: [],
  };

  getPartialInteractiveOject<S>(
    services: readonly InteractiveService[],
    value: S,
    scope: string,
  ): IDataError {
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
    return { dataErrors: dataResult, hasErrors: dataResult.length > 0 };
  }

  getInteractiveOject<S>(
    partialInteractiveOject: any,
    getContext: () => IInteractiveContext<S>,
  ): IDataErrorInteraction {
    const interactor = (s: string | undefined = undefined): IDataError =>
      this.innerCheckErrors<S>(s, getContext);
    const interactive: IDataErrorInteraction = {
      ...partialInteractiveOject,
      checkErrors: interactor,
    };
    return interactive;
  }

  innerCheckErrors<S>(
    scope = '*',
    getContext: () => IInteractiveContext<S>,
  ): IDataError {
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
  return {
    serviceName: DATA_ERROR_SERVICE_NAME,
    serviceDependencies: RuleServiceResolver<T>(rule, dependencies),
  };
}
