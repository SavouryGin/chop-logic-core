import { isDisjunctionCreationApplicable } from '../is-dusjunction-creation-applicable';
import { PropFormula } from '../../../common/types';
import { Operator } from '../../../common/enums';

describe('isDisjunctionCreationApplicable', () => {
  it('should return true when exactly one formula is provided', () => {
    const formula: PropFormula = { operator: Operator.Var, values: ['P'] };

    expect(isDisjunctionCreationApplicable([formula])).toBe(true);
  });

  it('should return false when no formulas are provided', () => {
    expect(isDisjunctionCreationApplicable([])).toBe(false);
  });

  it('should return false when more than one formula is provided', () => {
    const formula1: PropFormula = { operator: Operator.Var, values: ['P'] };
    const formula2: PropFormula = { operator: Operator.Var, values: ['Q'] };

    expect(isDisjunctionCreationApplicable([formula1, formula2])).toBe(false);
  });
});
