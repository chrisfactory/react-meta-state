import { IDataError } from './IDataError';
import { IDataErrorInteraction } from './IDataErrorInteraction';
import RuleBuilderService from '../../rules/service/RuleBuilderService';
import {
  IInteractData,
  IServiceInteractionFactory,
  IDataProducerService,
  MetaService,
} from '../IServiceDescriptor';

class DataErrorService
  implements
    IDataProducerService<IDataError>,
    IServiceInteractionFactory<IDataErrorInteraction> {
  private readonly _rule: RuleBuilderService;

  constructor(rule: RuleBuilderService, serviceName: string) {
    this.factoryName = 'data.error.service.result.factory';
    this.parentName = serviceName;
    this.identifier = `${serviceName} => ${this.factoryName}`;
    this._rule = rule;
  }

  readonly parentName: string;

  readonly factoryName: string;

  readonly identifier: string;

  readonly default: IDataError = {
    hasErrors: false,
    dataErrors: [],
  };

  getInteraction<S>(getContext: () => IInteractData<S>): IDataErrorInteraction {
    const interactor = (s: string | undefined = undefined): IDataError =>
      this.innerCheckErrors<S>(s, getContext);
    const interatcor: IDataErrorInteraction = {
      interact: interactor,
      CheckErrors: interactor,
    };
    return interatcor;
  }

  innerCheckErrors<S>(
    scope = '*',
    getContext: () => IInteractData<S>,
  ): IDataError {
    const context = getContext();
    const result = this.getNextResult(context.value, scope, context.services);
    context.callback(result);
    return result;
  }

  getNextResult<S>(
    value: S,
    scope: string,
    services: ReadonlyArray<MetaService>,
  ): IDataError {
    let dataResult = this.default;
    services.forEach((service) => {
      if (service.dataProducer.identifier === this.identifier) {
        dataResult = service.dataProducer.getData(
          dataResult,
          value,
          scope,
        ) as IDataError;
      }
    });

    return dataResult;
  }

  getData<S>(current: IDataError, value: S, scope: string): IDataError {
    const ruleResult = this._rule.check(value, scope);
    let datas = ruleResult.datas;
    if (current && current.hasErrors) {
      if (datas.length > 0) datas = current.dataErrors.concat(datas);
      else datas = current.dataErrors;
    }
    return {
      hasErrors: datas.length > 0,
      dataErrors: datas,
    };
  }
}

export { DataErrorService as default };
