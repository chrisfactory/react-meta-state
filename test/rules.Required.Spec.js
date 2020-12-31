/* eslint no-new-func: 0 */
import { Required } from '../src/Rules';

const dataError = ['error result'];
describe('Rules.Required', () => {
  it('Should return data for <submit>.', () => {
    [undefined, '', ''].forEach((element) => {
      const rule = Required(dataError);
      const ruleResult = rule.check(element, 'submit');
      expect(Array.isArray(ruleResult.datas)).to.equal(true);
      expect(ruleResult.datas.length).to.equal(1);
      expect(ruleResult.datas).to.equal(dataError);
    });
  });
  it('Should not return data for default scope filter <loaded>.', () => {
    [undefined, '', ''].forEach((element) => {
      const rule = Required(dataError);
      const ruleResult = rule.check(element, 'loaded');
      expect(Array.isArray(ruleResult.datas)).to.equal(true);
      expect(ruleResult.datas.length).to.equal(0);
    });
  });
  it('Should not return data for submit.', () => {
    [' ', ' txt ', 3, Date.now()].forEach((element) => {
      const rule = Required(dataError);
      const ruleResult = rule.check(element, 'submit');
      expect(Array.isArray(ruleResult.datas)).to.equal(true);
      expect(ruleResult.datas.length).to.equal(0);
    });
  });
});
