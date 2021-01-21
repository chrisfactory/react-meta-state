import RuleServiceResolver from '../../rules/service/RuleServiceResolver';
import { RuleElementDependencies } from '../../rules/element/RuleElementDependencies';
import { RuleBuilderDependencies } from '../../rules/element/dependencies/RuleBuilderDependencies';
import { RuleArgumentDependencyTypes } from '../../rules/element/dependencies/RuleArgumentDependencyTypes';
import { RuleElement } from '../../rules/element/RuleElement';
import {
  IDataInformation,
  IDataInformationInteraction,
} from './IDataInformationInteraction';
import {
  IInteractiveContext,
  IInteractiveServiceDescriptor,
  IInteractiveServiceProducer,
  InteractiveService,
} from '../IInteractiveServiceDescriptor';
import interactiveProducer from '../../decorator/InteractiveProducer';
import RuleBuilderService from '../../rules/service/RuleBuilderService';

const DATA_INFORMATION_SERVICE_NAME = 'data.information.producer';

@interactiveProducer(DATA_INFORMATION_SERVICE_NAME)
export class DataInformationService
  implements IInteractiveServiceProducer<IDataInformationInteraction> {
  readonly identifier: string = '';

  readonly default: IDataInformation = {
    hasInformations: false,
    dataInformations: [],
  };

  getPartialInteractiveOject<S>(
    services: readonly InteractiveService[],
    value: S,
    scope: string,
  ): IDataInformation {
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
    return {
      dataInformations: dataResult,
      hasInformations: dataResult.length > 0,
    };
  }

  getInteractiveOject<S>(
    partialInteractiveOject: any,
    getContext: () => IInteractiveContext<S>,
  ): IDataInformationInteraction {
    const interactor = (s: string | undefined = undefined): IDataInformation =>
      this.innerCheckInformations<S>(s, getContext);
    const interactive: IDataInformationInteraction = {
      ...partialInteractiveOject,
      checkInformations: interactor,
    };
    return interactive;
  }

  innerCheckInformations<S>(
    scope = '*',
    getContext: () => IInteractiveContext<S>,
  ): IDataInformation {
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
    serviceName: DATA_INFORMATION_SERVICE_NAME,
    serviceDependencies: RuleServiceResolver(rule, dependencies),
  };
  return serviceDescription;
}
