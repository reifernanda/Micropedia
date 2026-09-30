/**
 * Tipos e interfaces para o Card Didático de Dedução de Antibióticos no VITEK® 2 / AES
 * Baseado no treinamento técnico "De frente com o VITEK" - bioMérieux
 */

export type DeductionCategory = 'equivalente' | 'fenotipo' | 'sem_expertizacao' | 'conflitos';

export interface DeductionMechanism {
  id: DeductionCategory;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  concept: string;
  howItWorks: string[];
  requirements: string[];
  recommendationStatus: 'Recomendado' | 'Recomendado com Critério' | 'Não Recomendado na Rotina';
  recommendationColor: string;
  practicalExample: {
    organism: string;
    cardType: string;
    testedDrug: string;
    deducedDrugs: string[];
    justification: string;
    committeeRef: string;
  };
  advisorTip: string;
  dangerAlert?: string;
}

export interface InteractiveCase {
  id: string;
  title: string;
  organism: string;
  card: string;
  context: string;
  testedAntimicrobials: {
    name: string;
    mic: string;
    interpretation: 'S' | 'I' | 'R';
  }[];
  deductionGoal: string[];
  appliedMethod: 'Regra Equivalente' | 'Dedução Fenotípica' | 'Tentativa Inválida';
  ruleNumber?: string;
  hasBreakpoints: boolean;
  outcome: {
    success: boolean;
    reportLines: {
      antimicrobial: string;
      mic?: string;
      int: 'S' | 'I' | 'R';
      deductionReason: string;
    }[];
    explanation: string;
    advisorTakeaway: string;
  };
}

export interface ChecklistItem {
  id: string;
  question: string;
  category: 'config' | 'regra' | 'ponto_corte' | 'comite';
  explanation: string;
  action: string;
  screenTarget: string;
}

export interface QuickFlashcard {
  id: number;
  front: string;
  back: string;
  category: string;
  tag: string;
}
