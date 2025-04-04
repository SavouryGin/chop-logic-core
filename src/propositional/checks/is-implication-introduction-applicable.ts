import { PropFormula } from '../../common/types';

/**
 * Checks if implication introduction is applicable.
 *
 * Implication introduction allows us to infer an implication from any two formulas
 * one of which is an antecedent and the second one is a consequent.
 *
 * @param formulas - An array of propositional formulas to check.
 * @returns `true` if all there is exactly two formulas in the array, otherwise `false`.
 */
export function isImplicationIntroductionApplicable(formulas: PropFormula[]): boolean {
  return formulas.length === 2;
}
