/* eslint no-new-func: 0 */
import { NotEqual } from '../src/Rules';

const dataError = ['error result'];
describe('Rules.NotEqual', () => {
  it('Should return data for <submit>.', () => {
    [undefined, '', '', 1, 'text', Date.now()].forEach((element) => {
      const rule = NotEqual(element, dataError);
      const ruleResult = rule.check(element, 'submit');
      expect(Array.isArray(ruleResult.datas)).to.equal(true);
      expect(ruleResult.datas.length).to.equal(1);
      expect(ruleResult.datas).to.equal(dataError);
    });
  });
  it('Should not return data for default scope filter <loaded>.', () => {
    [undefined, '', '', 1, 'text', Date.now()].forEach((element) => {
      const rule = NotEqual(element, dataError);
      const ruleResult = rule.check(element, 'loaded');
      expect(Array.isArray(ruleResult.datas)).to.equal(true);
      expect(ruleResult.datas.length).to.equal(0);
    });
  });
  it('Should not return data for submit.', () => {
    [undefined, '', '', 1, 'text', Date.now()].forEach((element) => {
      const rule = NotEqual(element, dataError);
      const ruleResult = rule.check('none', 'submit');
      expect(Array.isArray(ruleResult.datas)).to.equal(true);
      expect(ruleResult.datas.length).to.equal(0);
    });
  });

  it('Should return data for specific scope.', () => {
    ['scope1', 'scope2'].forEach((scope) => {
      [undefined, '', '', 1, 'text', Date.now()].forEach((element) => {
        const rule = NotEqual(element, dataError, ['scope1', 'scope2']);
        const ruleResult = rule.check(element, scope);
        expect(Array.isArray(ruleResult.datas)).to.equal(true);
        expect(ruleResult.datas.length).to.equal(1);
        expect(ruleResult.datas).to.equal(dataError);
      });
    });
  });
  it('Should not return data for specific scope..', () => {
    ['scope1', 'scope2'].forEach((scope) => {
      [undefined, '', '', 1, 'text', Date.now()].forEach((element) => {
        const rule = NotEqual(element, dataError, ['!scope1', '!scope2']);
        const ruleResult = rule.check(element, scope);
        expect(Array.isArray(ruleResult.datas)).to.equal(true);
        expect(ruleResult.datas.length).to.equal(0);
      });
    });
  });
});
