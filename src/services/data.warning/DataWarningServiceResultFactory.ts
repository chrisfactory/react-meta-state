import RuleBuilderService from '../../rules/service/RuleBuilderService';
import { IDataWarning } from './IDataWarning';
import { IDataWarningInteraction } from './IDataWarningInteraction';
import {
  IInteractData,
  IServiceInteractionFactory,
  IServiceResultFactory,
  MetaService,
} from '../IServiceDescriptor';

class DataWarningServiceResultFactory
  implements
    IServiceResultFactory<IDataWarning>,
    IServiceInteractionFactory<IDataWarningInteraction> {
  private readonly _rule: RuleBuilderService;

  constructor(rule: RuleBuilderService, serviceName: string) {
    this.factoryName = 'data.warning.service.result.factory';
    this.parentName = serviceName;
    this.identifier = `${serviceName} => ${this.factoryName}`;
    this._rule = rule;
  }

  readonly parentName: string;

  readonly factoryName: string;

  readonly identifier: string;

  readonly default: IDataWarning = {
    hasWarnings: false,
    dataWarnings: [],
  };

  getInteraction<S>(
    getContext: () => IInteractData<S>,
  ): IDataWarningInteraction {
    const interactor = (s: string | undefined = undefined): IDataWarning =>
      this.innerCheckWarnings<S>(s, getContext);
    const interatcor: IDataWarningInteraction = {
      interact: interactor,
      CheckWarnings: interactor,
    };
    return interatcor;
  }

  innerCheckWarnings<S>(
    scope = '*',
    getContext: () => IInteractData<S>,
  ): IDataWarning {
    const context = getContext();
    const result = this.getNextResult(context.value, scope, context.services);
    context.callback(result);
    return result;
  }

  getNextResult<S>(
    value: S,
    scope: string,
    services: ReadonlyArray<MetaService>,
  ): IDataWarning {
    let dataResult = this.default;
    services.forEach((service) => {
      if (service.resultFactory.identifier === this.identifier) {
        dataResult = service.resultFactory.getResult(
          dataResult,
          value,
          scope,
        ) as IDataWarning;
      }
    });

    return dataResult;
  }

  getResult<S>(current: IDataWarning, value: S, scope: string): IDataWarning {
    const ruleResult = this._rule.check(value, scope);
    let datas = ruleResult.datas;
    if (current && current.hasWarnings) {
      if (datas.length > 0) datas = current.dataWarnings.concat(datas);
      else datas = current.dataWarnings;
    }
    return {
      hasWarnings: datas.length > 0,
      dataWarnings: datas,
    };
  }
}
export { DataWarningServiceResultFactory as default };
