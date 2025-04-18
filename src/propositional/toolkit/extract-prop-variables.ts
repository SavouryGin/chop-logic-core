import { PropFormula, PropFormulaVariablesMap } from '../../models';
import { Operator } from '../../enums';

/**
 * Extracts all propositional variables from a given formula and returns them in a sorted map.
 *
 * @param formula - The propositional formula.
 * @returns A map of variables, sorted alphabetically.
 */
export function extractPropVariables(formula: PropFormula): PropFormulaVariablesMap {
  const variablesSet: Set<string> = new Set();

  function traverse(node: PropFormula): void {
    if (node.operator === Operator.Var) {
      variablesSet.add(node.values[0] as string); // Extract variable name
      return;
    }

    if (Array.isArray(node.values)) {
      const subFormulas = node.values as PropFormula[];
      subFormulas.forEach(traverse);
    }
  }

  traverse(formula);

  const sortedVariables = Array.from(variablesSet).sort();

  return new Map(sortedVariables.map((varName, index) => [index, [varName]]));
}
