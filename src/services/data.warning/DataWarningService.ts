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
import RuleBuilderService from '../../rules/service/RuleBuilderService';

class DataWarningService
  implements IInteractiveServiceProducer<IDataWarningInteraction> {
  constructor(
    descriptor: IInteractiveServiceDescriptor<IDataWarningInteraction>,
  ) {
    this.identifier = descriptor.serviceName;
  }

  readonly identifier: string;

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
        const rule = inService.serviceDependencies() as RuleBuilderService;
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
    context.interactionCallback(this.identifier, result);
    return result;
  }
}

export { DataWarningService as default };
