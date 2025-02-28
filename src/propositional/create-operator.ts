import { PropSymbol } from '../common/types';
import { Glyph, GlyphType, Operator } from '../common/enums';

/**
 * Converts a given PropSymbol into its corresponding logical operator.
 * If the symbol is a known operator glyph, returns the matching Operator enum.
 * If the symbol represents a variable, returns Operator.Var.
 * Throws an error if the symbol is unrecognized and not a variable.
 */
export function createOperator(symbol: PropSymbol): Operator {
  switch (symbol.atom[0]) {
    case Glyph.Negation: {
      return Operator.Not;
    }
    case Glyph.Conjunction: {
      return Operator.And;
    }
    case Glyph.Disjunction: {
      return Operator.Or;
    }
    case Glyph.Implication: {
      return Operator.Implies;
    }
    case Glyph.Equivalence: {
      return Operator.Equiv;
    }
    default: {
      if (symbol.type === GlyphType.Variable) {
        return Operator.Var;
      } else {
        throw new Error(`Cannot create an operator from symbol "${symbol.atom[0]}".`);
      }
    }
  }
}
