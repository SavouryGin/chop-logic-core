import { ProofStep, PropFormula } from '../../models';
import { HilbertCalculusSchema, Step } from '../../enums';
import { convertPropFormulaToString } from '../toolkit/convert-prop-formula-to-string';
import { createPropExpression } from '../factory/create-prop-expression';
import { implicationIntroduction } from './implication-introduction';
import { implicationDistribution } from './implication-distribution';
import { implicationReversal } from './implication-reversal';
import { implicationElimination } from './implication-elimination';
import { convertPropFormulaToExpression } from '../toolkit/convert-prop-formula-to-expression';

type AxiomPayload = {
  formulas: PropFormula[];
  schema: HilbertCalculusSchema;
};

type DerivedPayload = {
  formulas: PropFormula[];
  schema: HilbertCalculusSchema.IE;
  derivedFrom: number[];
};

type BasePayload = {
  formula: PropFormula;
};

interface HilbertProofStepInput<T> {
  index: number;
  step: T extends Step.Derivation ? Step.Derivation : T extends Step.Axiom ? Step.Axiom : Exclude<Step, Step.Derivation | Step.Axiom>;
  payload: T extends Step.Derivation ? DerivedPayload : T extends Step.Axiom ? AxiomPayload : BasePayload;
}

/**
 * Generates a ProofStep object for use in Hilbert-style logic derivations.
 * Supports Axiom, Derivation, and Base step types. Applies appropriate
 * schema-based transformations and constructs the string and symbolic expression views.
 * @param input - An object with necessary data for the new proof step.
 * @returns A new proof step based on the input.
 */
export function generateHilbertProofStep<T>(input: HilbertProofStepInput<T>): ProofStep {
  const { index, step } = input;

  if (step === Step.Derivation) {
    return buildDerivedStep(index, input.payload as DerivedPayload);
  }

  if (step === Step.Axiom) {
    return buildAxiomStep(index, input.payload as AxiomPayload);
  }

  return buildBaseStep(index, step, input.payload as BasePayload);
}

function buildDerivedStep(index: number, payload: DerivedPayload): ProofStep {
  const { formulas, schema, derivedFrom } = payload;
  const formula = getRuleFunction(schema)(formulas);
  return {
    index,
    step: Step.Derivation,
    formula,
    stringView: convertPropFormulaToString(formula),
    expression: convertPropFormulaToExpression(formula),
    comment: `${schema}: ${derivedFrom.join(', ')}`,
    derivedFrom,
  };
}

function buildAxiomStep(index: number, payload: AxiomPayload): ProofStep {
  const { formulas, schema } = payload;
  const formula = getRuleFunction(schema)(formulas);
  return {
    index,
    step: Step.Axiom,
    formula,
    stringView: convertPropFormulaToString(formula),
    expression: convertPropFormulaToExpression(formula),
    comment: `${schema}`,
  };
}

function buildBaseStep(index: number, step: Step, payload: BasePayload): ProofStep {
  return {
    index,
    step,
    formula: payload.formula,
    stringView: convertPropFormulaToString(payload.formula),
    expression: createPropExpression(convertPropFormulaToString(payload.formula)),
    comment: `${step}`,
  };
}

function getRuleFunction(schema: HilbertCalculusSchema) {
  switch (schema) {
    case HilbertCalculusSchema.II:
      return implicationIntroduction;
    case HilbertCalculusSchema.ID:
      return implicationDistribution;
    case HilbertCalculusSchema.IR:
      return implicationReversal;
    case HilbertCalculusSchema.IE:
      return implicationElimination;
  }
}
