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

// Services
import {
  IInteractData,
  IServiceDescriptor,
  IServiceInteraction,
  IServiceInteractionFactory,
  IDataProducerService,
  MetaService,
} from './services/IServiceDescriptor';
import { ServiceResult } from './services/ServiceResult';
// Services.Interact
// Services.DataErrors
import { DataError } from './services/data.error/DataError';
import DataErrorService from './services/data.error/DataErrorService';
import { IDataError } from './services/data.error/IDataError';
import { IDataErrorInteraction } from './services/data.error/IDataErrorInteraction';
// Services.DataWarnings
import { DataWarning } from './services/data.warning/DataWarning';
import DataWarningService from './services/data.warning/DataWarningService';
import { IDataWarning } from './services/data.warning/IDataWarning';
import { IDataWarningInteraction } from './services/data.warning/IDataWarningInteraction';
// hooks
import useMetaState from './useMetaState';
import useDataErrorGroup, { IDataErrorGroup } from './useDataErrorGroup';

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
// Services
export type {
  IServiceDescriptor,
  IDataProducerService,
  MetaService,
  ServiceResult,
};
// Service.Interact
export type { IServiceInteractionFactory, IServiceInteraction, IInteractData };
// Services.DataErrors
export type {
  DataErrorService,
  IDataError,
  IDataErrorInteraction as IDataErrorIneraction,
};
export { DataError };
// Services.Warnings
export type {
  DataWarningService,
  IDataWarning,
  IDataWarningInteraction as IDataWarningIneraction,
};
export { DataWarning };
// Services.DataWarnings

// hooks
export { useMetaState, useDataErrorGroup };
export type { IDataErrorGroup };
