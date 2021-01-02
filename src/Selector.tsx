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
