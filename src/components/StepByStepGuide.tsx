import React, { useState } from 'react';
import { STEP_BY_STEP_STEPS } from '../data/deductionContent';
import {
  Sliders,
  CreditCard,
  FileCode2,
  Target,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  ShieldAlert,
  Monitor
} from 'lucide-react';

export const StepByStepGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sliders':
        return <Sliders className="w-5 h-5 text-blue-600" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-indigo-600" />;
      case 'FileCode2':
        return <FileCode2 className="w-5 h-5 text-amber-600" />;
      case 'Target':
        return <Target className="w-5 h-5 text-emerald-600" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-purple-600" />;
      default:
        return <Sliders className="w-5 h-5 text-blue-600" />;
    }
  };

  const currentStepData = STEP_BY_STEP_STEPS.find((s) => s.step === activeStep) || STEP_BY_STEP_STEPS[0];

  return (
    <div className="space-y-6">
      {/* Step Progress Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Procedimento Operacional Padrão
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Roteiro de Configuração de Dedução no VITEK® 2 & AES
            </h3>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            Passo {activeStep} de {STEP_BY_STEP_STEPS.length}
          </span>
        </div>

        {/* Step Navigation Pill Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {STEP_BY_STEP_STEPS.map((s) => {
            const isCurrent = s.step === activeStep;
            const isCompleted = s.step < activeStep;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-blue-50 border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                    : isCompleted
                    ? 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCurrent
                        ? 'bg-blue-600 text-white'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isCompleted ? '✓' : s.step}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">P0{s.step}</span>
                </div>
                <span className={`text-xs font-semibold line-clamp-1 ${isCurrent ? 'text-blue-950' : 'text-slate-800'}`}>
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Detail Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Action list & Instructions (7 cols) */}
        <div className="p-6 sm:p-8 lg:col-span-7 space-y-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                {getIcon(currentStepData.screenIcon)}
              </span>
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {currentStepData.subtitle}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {currentStepData.title}
                </h4>
              </div>
            </div>
            <p className="text-sm text-slate-600 pt-2 leading-relaxed">
              {currentStepData.description}
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Ações Práticas do Assessor no Sistema:
            </h5>
            <div className="space-y-2.5">
              {currentStepData.actions.map((act, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-800"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
              disabled={activeStep === 1}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Passo Anterior
            </button>

            <button
              onClick={() => setActiveStep((prev) => Math.min(STEP_BY_STEP_STEPS.length, prev + 1))}
              disabled={activeStep === STEP_BY_STEP_STEPS.length}
              className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
            >
              Próximo Passo <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Visual Screen Mockup & Guidance Box (5 cols) */}
        <div className="bg-slate-900 text-slate-100 p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Monitor className="w-4 h-4" />
                Interface Virtual do Software
              </span>
              <span className="text-[11px] text-slate-400 font-mono">VITEK® 2 Release 9.0</span>
            </div>

            {/* Dynamic visual representation of software screen based on step */}
            {activeStep === 1 && (
              <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                <div className="text-slate-400 font-bold border-b border-slate-800 pb-1 text-[11px]">
                  TELA: TIPOS DE DEDUÇÃO (AES)
                </div>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="text-emerald-400 font-bold">[X]</span> Activar Validação Biológica
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="text-emerald-400 font-bold">[X]</span> Activar Regras Forçadas
                  </div>
                  <div className="flex items-center gap-2 text-blue-400 font-bold">
                    <span className="text-blue-400">[X]</span> Activar a Dedução por Fenótipo
                  </div>
                  <div className="flex items-center gap-2 text-blue-400 font-bold">
                    <span className="text-blue-400">[X]</span> Activar a Dedução por Antibiótico Equivalente
                  </div>
                  <div className="flex items-center gap-2 text-rose-400 font-bold pt-1 border-t border-slate-800">
                    <span className="text-slate-500">[ ]</span> Activar Dedução sem Expertização (DESMARCAR)
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                <div className="text-slate-400 font-bold border-b border-slate-800 pb-1 text-[11px]">
                  TELA: CONFIGURAÇÃO GERAL DE TSA (VITEK 2 SYSTEM)
                </div>
                <div className="text-[11px] text-slate-400">
                  Selecione o cartão de interesse (ex: AST-P637 / AST-N408) &gt; [Editar]
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-blue-300 font-bold block text-[11px]">Antibióticos a Deduzir:</span>
                  <div className="text-slate-300 text-[10px] leading-relaxed">
                    Amoxicilina, Ampicilina/Sulbactam, Ciprofloxacino, Imipenem, Tobramicina
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                <div className="text-slate-400 font-bold border-b border-slate-800 pb-1 text-[11px]">
                  TELA: REGRAS DE DEDUÇÃO &gt; ADICIONAR REGRA
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="text-emerald-400 font-bold">
                    [•] Copiar uma regra existente (RECOMENDADO)
                  </div>
                  <div className="text-slate-400 pl-4">Padrão base: CLSI / EUCAST / BrCAST</div>
                  <div className="text-slate-300 pt-1">
                    Se microrganismo é: <span className="text-blue-300">Enterococcus</span>
                  </div>
                  <div className="text-slate-300">
                    E antibiótico testado é: <span className="text-blue-300">Levofloxacino</span>
                  </div>
                  <div className="text-slate-300">
                    E a interpretação é: <span className="text-blue-300">S (Sensível)</span>
                  </div>
                  <div className="text-slate-300">
                    Deduzir interpretação para: <span className="text-emerald-400">Ciprofloxacino (S)</span>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                <div className="text-slate-400 font-bold border-b border-slate-800 pb-1 text-[11px]">
                  TELA: CONCENTRAÇÕES CRÍTICAS (AES)
                </div>
                <div className="text-[10px] text-slate-400">
                  Norma de Interpretação: BrCAST / EUCAST
                </div>
                <table className="w-full text-[10px] border border-slate-800">
                  <thead className="bg-slate-800 text-slate-400">
                    <tr>
                      <th className="p-1">Antibiótico</th>
                      <th className="p-1">S</th>
                      <th className="p-1">R</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300 divide-y divide-slate-800">
                    <tr>
                      <td className="p-1 font-sans">Imipenem</td>
                      <td className="p-1">&lt;= 2</td>
                      <td className="p-1">&gt; 4</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-sans">Tobramicina</td>
                      <td className="p-1">&lt;= 2</td>
                      <td className="p-1">&gt; 4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeStep === 5 && (
              <div className="space-y-2 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                <div className="text-slate-400 font-bold border-b border-slate-800 pb-1 text-[11px]">
                  TELA: AUDITORIA DO LAUDO (RELATÓRIO AES)
                </div>
                <div className="text-[11px] text-emerald-400 font-bold">
                  ✓ Resultados do AES: CONSISTENTE
                </div>
                <div className="text-[10px] text-slate-300 pt-1">
                  Amoxicilina: Deduzido por Ampicilina (Regra 662)
                </div>
                <div className="text-[10px] text-slate-300">
                  Ciprofloxacino: Deduzido por Levofloxacino (Regra 1242)
                </div>
                <div className="text-[10px] text-slate-300">
                  Imipenem: Deduzido pelo Fenótipo (Breakpoint OK)
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
            <strong className="text-amber-400 block mb-1">Lembrete para Visitas de Campo:</strong>
            Sempre execute uma reanálise de um isolado de controle após qualquer alteração para confirmar que as regras foram ativadas corretamente.
          </div>
        </div>
      </div>
    </div>
  );
};
