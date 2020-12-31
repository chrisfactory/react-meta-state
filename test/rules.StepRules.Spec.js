/* eslint no-new-func: 0 */
import {StepRules, Equal, Required } from '../src/index';

const dataError = ['error result'];
const dataError2 = ['error result2'];
describe('Rules.StepRules', () => {
  it('Should return data step by step With [*].', () => {
    [undefined, '', ''].forEach((element) => {
      const rule = StepRules([Required(dataError,"loaded"),Equal("none",dataError2,"submit")],'*');
   
     //step 1 Required => loaded 
      var ruleResult = rule.check(element,"loaded");
      expect(Array.isArray(ruleResult.datas)).to.equal(true);
      expect(ruleResult.datas.length).to.equal(1);
      expect(ruleResult.datas).to.equal(dataError);
      //step 2 Equal => submit 
      ruleResult = rule.check('not none',"submit");
      expect(Array.isArray(ruleResult.datas)).to.equal(true);
      expect(ruleResult.datas.length).to.equal(1);
      expect(ruleResult.datas).to.equal(dataError2);

      //step 2 No error => submit 
      ruleResult = rule.check('none',"submit");
      expect(Array.isArray(ruleResult.datas)).to.equal(true);
      expect(ruleResult.datas.length).to.equal(0); 
    });
  });
  it('Should not return data in first step => step by step Without [*].', () => {
    [undefined, '', ''].forEach((element) => {
      const rule = StepRules([Required(dataError,"loaded"),Equal("none",dataError2,"submit")]);
   
     //step 1 Required => loaded 
      var ruleResult = rule.check(element,"loaded");
      expect(Array.isArray(ruleResult.datas)).to.equal(true);
      expect(ruleResult.datas.length).to.equal(0); 
      //step 2 Equal => submit 
      ruleResult = rule.check('not none',"submit");
      expect(Array.isArray(ruleResult.datas)).to.equal(true);
      expect(ruleResult.datas.length).to.equal(1);
      expect(ruleResult.datas).to.equal(dataError2);

      //step 2 No error => submit 
      ruleResult = rule.check('none',"submit");
      expect(Array.isArray(ruleResult.datas)).to.equal(true);
      expect(ruleResult.datas.length).to.equal(0); 
    });
  });
});
