import { IDataError, IDataErrorInteraction } from './IDataErrorInteraction';
import {
  IInteractiveContext,
  IInteractiveServiceDescriptor,
  IInteractiveServiceProducer,
  InteractiveService,
} from '../IInteractiveServiceDescriptor';
import RuleBuilderService from '../../rules/service/RuleBuilderService';

class DataErrorService
  implements IInteractiveServiceProducer<IDataErrorInteraction> {
  constructor(
    descriptor: IInteractiveServiceDescriptor<IDataErrorInteraction>,
  ) {
    this.identifier = descriptor.serviceName;
  }

  readonly identifier: string;

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

export { DataErrorService as default };
