/* eslint no-new-func: 0 */
import { InScope } from '../src/index';

describe('Rules.InScope', () => {
  it('Should be include in scope.', () => {
    [
      '*',
      ['*'],
      ['*', 'custom.test'],
      ['*', 'auther'],
      'custom.test',
      ['custom.test'],
    ].forEach((element) => {
      const scopeResul = InScope(element, 'custom.test');
      expect(scopeResul).to.equal(true);
    });
  });
  it('Should be include in scope with star.', () => {
    ['*', ['*'], 'custom.test', ['custom.test']].forEach((element) => {
      const scopeResul = InScope(element, '*');
      expect(scopeResul).to.equal(true);
    });
  });
  it('Should be not include in scope.', () => {
    ['!custom.test', ['*', '!custom.test'], [''], [], '', undefined].forEach(
      (element) => {
        const scopeResul = InScope(element, 'custom.test');
        expect(scopeResul).to.equal(false);
      },
    );
  });

  it('Should be not include in scope with incorrect selector.', () => {
    ['!custom.test', '!valid', '', '!', undefined].forEach((element) => {
      const scopeResul = InScope(['*', '!custom.test'], element);
      expect(scopeResul).to.equal(false);
    });
  });
});
