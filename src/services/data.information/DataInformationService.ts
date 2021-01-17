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
import RuleBuilderService from '../../rules/service/RuleBuilderService';

class DataInformationService
  implements IInteractiveServiceProducer<IDataInformationInteraction> {
  constructor(
    descriptor: IInteractiveServiceDescriptor<IDataInformationInteraction>,
  ) {
    this.identifier = descriptor.serviceName;
  }

  readonly identifier: string;

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

export { DataInformationService as default };
