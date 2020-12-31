export type Selector =
  | string
  | '*'
  | 'submit'
  | '!submit'
  | 'changed'
  | '!changed'
  | 'loaded'
  | '!loaded';
export type Scope = Selector[] | Selector;
export const defaultScope: Scope = ['*', '!loaded'];

export function InScope(scope: Scope, selector: string): boolean {
  if (selector === '*') return true;
  if (!selector || selector === '' || selector[0] === '!') return false;

  const none = `!${selector}`;
  let scopeArray: Array<string> = [];
  if (!Array.isArray(scope)) {
    if (scope && scope !== '') scopeArray = [scope];
  } else {
    scopeArray = scope;
  }
  if (scopeArray.length === 0) return false;

  if (scopeArray.indexOf(none) !== -1) return false;
  if (scopeArray.indexOf('*') !== -1) return true;
  return scopeArray.indexOf(selector) !== -1;
}

export type Data = string; // ReactNode | ReactNodeArray;
export type Datas = Data[];
export interface RuleResult {
  datas: Datas;
}

export type ArgumentTypes<F extends (...args: any[]) => any> = F extends (
  ...args: infer A
) => any
  ? A
  : never;
export interface RuleBuilder<T extends (...args: any[]) => any> {
  check: (
    testWith: any,
    selector: Selector,
    dependencies: ArgumentTypes<T>,
  ) => RuleResult;
}
export interface RuleBuilderElement {
  check: (testWith: any, selector: Selector) => RuleResult;
}
export function Required(failedDatas: Datas): RuleBuilderElement;
export function Required(failedDatas: Datas, scope: Scope): RuleBuilderElement;
export function Required(
  failedDatas: Datas,
  scope: Scope = defaultScope,
): RuleBuilderElement {
  return {
    check: (testWith, selector) => {
      if (!InScope(scope, selector)) return { datas: [] };
      if (!testWith || testWith === '') return { datas: failedDatas };
      return { datas: [] };
    },
  };
}
export function Equal(equalWith: any, failedDatas: Datas): RuleBuilderElement;
export function Equal(
  equalWith: any,
  failedDatas: Datas,
  scope: Scope,
): RuleBuilderElement;
export function Equal(
  equalWith: any,
  failedDatas: Datas,
  scope: Scope = defaultScope,
): RuleBuilderElement {
  return {
    check: (testWith, selector) => {
      if (!InScope(scope, selector)) return { datas: [] };
      if (equalWith !== testWith) return { datas: failedDatas };
      return { datas: [] };
    },
  };
}
export function NotEqual(
  equalWith: any,
  failedDatas: Datas,
): RuleBuilderElement;
export function NotEqual(
  equalWith: any,
  failedDatas: Datas,
  scope: Scope,
): RuleBuilderElement;
export function NotEqual(
  equalWith: any,
  failedDatas: Datas,
  scope: Scope = defaultScope,
): RuleBuilderElement {
  return {
    check: (testWith, selector) => {
      if (!InScope(scope, selector)) return { datas: [] };
      if (equalWith === testWith) return { datas: failedDatas };
      return { datas: [] };
    },
  };
}
export function RuleDependences<
  T extends (...args: any[]) => RuleBuilderElement
>(ruleDefinition: T): RuleBuilder<T> {
  return {
    check: (testWith, selector, dataArg) =>
      ruleDefinition(...dataArg).check(testWith, selector),
  };
}

export function ConcatRules(rules: RuleBuilderElement[]): RuleBuilderElement;
export function ConcatRules(
  rules: RuleBuilderElement[],
  scope: Scope,
): RuleBuilderElement;
export function ConcatRules(
  rules: RuleBuilderElement[],
  scope: Scope = defaultScope,
): RuleBuilderElement {
  return {
    check: (testWith, selector) => {
      if (!InScope(scope, selector)) return { datas: [] };
      for (let index = 0; index < rules.length; index++) {
        const rule = rules[index];
        const result = rule.check(testWith, selector);
        if (result.datas && result.datas.length > 0) return result;
      }
      return { datas: [] };
    },
  };
}
export function StepRules(rules: RuleBuilderElement[]): RuleBuilderElement;
export function StepRules(
  rules: RuleBuilderElement[],
  scope: Scope,
): RuleBuilderElement;
export function StepRules(
  rules: RuleBuilderElement[],
  scope: Scope = defaultScope,
): RuleBuilderElement {
  return {
    check: (testWith, selector) => {
      if (!InScope(scope, selector)) return { datas: [] };
      for (let index = 0; index < rules.length; index++) {
        const rule = rules[index];
        const result = rule.check(testWith, selector);
        if (result.datas && result.datas.length > 0) return result;
      }
      return { datas: [] };
    },
  };
}
