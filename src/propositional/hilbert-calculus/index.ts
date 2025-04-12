import { implicationIntroduction } from './implication-introduction';
import { implicationDistribution } from './implication-distribution';
import { implicationReversal } from './implication-reversal';
import { implicationElimination } from './implication-elimination';
import { generateHilbertProofStep } from './generate-hilbert-proof-step';

export const HilbertCalculus = Object.freeze({
  II: implicationIntroduction,
  ID: implicationDistribution,
  IR: implicationReversal,
  IE: implicationElimination,
  generateStep: generateHilbertProofStep,
});
