// Selector
import { Selector, Scope, defaultScope, InScope } from './Selector';
// rules
import { ConcatRules } from './rules/element/collection/ConcatRules';
import { Equal } from './rules/element/item/Equal';
import { NotEqual } from './rules/element/item/NotEqual';
import { Required } from './rules/element/item/Required';
import { RuleArgumentDependencyTypes } from './rules/element/dependencies/RuleArgumentDependencyTypes';
import { RuleBuilderDependencies } from './rules/element/dependencies/RuleBuilderDependencies';
import { RuleElement } from './rules/element/RuleElement';
import { RuleElementDependencies } from './rules/element/RuleElementDependencies';
import RuleBuilderService from './rules/service/RuleBuilderService';
import RuleBuilderDependenciesService from './rules/service/RuleBuilderDependenciesService';
import RuleBuilderElementService from './rules/service/RuleBuilderElementService';
import ServiceResolver from './rules/service/RuleServiceResolver';
import RuleDependencies from './rules/element/dependencies/RuleDependencies';
import { Data, Datas, RuleResult } from './rules/RuleResult';
import { StepRules } from './rules/element/collection/StepRules';
// decorator
import InteractiveProducer from './decorator/InteractiveProducer';
// Services
import {
  InteractiveService,
  InteractiveServices,
  IInteractiveServiceDescriptor,
  IInteractiveServiceProducer,
  IInteractiveContext,
} from './services/IInteractiveServiceDescriptor';
import { ServiceResult } from './services/ServiceResult';
// Services.Interact
// Services.DataErrors
import { DataError } from './services/data.error/DataError';
import {
  IDataErrorInteraction,
  IDataError,
} from './services/data.error/IDataErrorInteraction';
// Services.DataWarnings
import { DataWarning } from './services/data.warning/DataWarning';
import {
  IDataWarningInteraction,
  IDataWarning,
} from './services/data.warning/IDataWarningInteraction';
// Services.DataInformations
import { DataInformation } from './services/data.information/DataInformation';
import {
  IDataInformationInteraction,
  IDataInformation,
} from './services/data.information/IDataInformationInteraction';
// hooks
import useMetaState from './useMetaState';
import useDataErrorGroup, { IDataErrorGroup } from './useMetaGroup';

// Selector
export { defaultScope, InScope };
export type { Selector, Scope };
// rules
export type { Data, Datas, RuleResult };
export type {
  RuleElementDependencies as RuleBuilderElementDependencies,
  RuleArgumentDependencyTypes,
  RuleBuilderDependencies,
  RuleElement as RuleBuilderElement,
  RuleBuilderService,
  RuleBuilderDependenciesService,
  RuleBuilderElementService,
};
export { ServiceResolver, RuleDependencies, ConcatRules, StepRules };
export { Required, NotEqual, Equal };
//
export { InteractiveProducer };
// Services
export type {
  InteractiveService,
  InteractiveServices,
  IInteractiveServiceDescriptor,
  IInteractiveServiceProducer,
  IInteractiveContext,
  ServiceResult,
};
// Services.DataErrors
export type { IDataError, IDataErrorInteraction };
export { DataError };
// Services.Warnings
export type { IDataWarning, IDataWarningInteraction };
export { DataWarning };
// Services.Informations
export type { IDataInformation, IDataInformationInteraction };
export { DataInformation };
// hooks
export { useMetaState, useDataErrorGroup };
export type { IDataErrorGroup };
