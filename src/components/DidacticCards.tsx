import React, { useState } from 'react';
import { DEDUCTION_MECHANISMS } from '../data/deductionContent';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

export const DidacticCards: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('equivalente');

  const selectedMechanism = DEDUCTION_MECHANISMS.find((m) => m.id === selectedId) || DEDUCTION_MECHANISMS[0];

  return (
    <div className="space-y-8">
      {/* Category selector pills */}
      <div className="flex flex-wrap gap-2.5 pb-2 border-b border-slate-200">
        {DEDUCTION_MECHANISMS.map((m) => {
          const isSelected = m.id === selectedId;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedId(m.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md font-semibold ring-2 ring-blue-600/30'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{m.title}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${
                  isSelected ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {m.badge}
              </span>
            </button>
          );
        })}

        {/* Extra Comparative Conflict Pill */}
        <button
          onClick={() => setSelectedId('conflito')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
            selectedId === 'conflito'
              ? 'bg-amber-600 text-white shadow-md font-semibold ring-2 ring-amber-600/30'
              : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-500" />
          <span>O Duelo: Regra vs Fenótipo</span>
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-200/70 text-amber-900 font-bold">
            Pegadinha do Vídeo!
          </span>
        </button>
      </div>

      {/* Main Didactic Card Display */}
      {selectedId !== 'conflito' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
          {/* Card Top Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-200/80">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${selectedMechanism.badgeColor}`}>
                  {selectedMechanism.badge}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${selectedMechanism.recommendationColor}`}
                >
                  Status: {selectedMechanism.recommendationStatus}
                </span>
              </div>
              <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                <BookOpen className="w-4 h-4 text-blue-500" /> Referência: VITEK® 2 AES Guidance
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {selectedMechanism.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-1.5 max-w-4xl leading-relaxed">
              {selectedMechanism.subtitle}
            </p>

            <div className="mt-4 p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-slate-800 text-sm leading-relaxed">
              <strong className="text-blue-900 font-semibold flex items-center gap-1.5 mb-1">
                <Info className="w-4 h-4 text-blue-600" /> Conceito-Chave:
              </strong>
              {selectedMechanism.concept}
            </div>
          </div>

          {/* Card Body Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Como Funciona & Requisitos */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  Como Funciona no Sistema VITEK® 2
                </h4>
                <div className="space-y-2.5">
                  {selectedMechanism.howItWorks.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700">
                      <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  Requisitos Obrigatórios para o Laboratório
                </h4>
                <ul className="space-y-2">
                  {selectedMechanism.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Exemplo Real do Vídeo & Dicas */}
            <div className="space-y-6">
              {/* Practical Case Example */}
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                      Exemplo Prático do Treinamento
                    </span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Cartão: {selectedMechanism.practicalExample.cardType}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-400">Microrganismo:</span>{' '}
                    <strong className="text-slate-200 italic">{selectedMechanism.practicalExample.organism}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Droga Testada no Cartão:</span>{' '}
                    <span className="text-blue-300 font-semibold">{selectedMechanism.practicalExample.testedDrug}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Antibióticos Deduzidos:</span>{' '}
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {selectedMechanism.practicalExample.deducedDrugs.map((d, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-400/30 font-medium text-xs"
                        >
                          * {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 text-slate-300 leading-relaxed text-xs">
                    <strong className="text-slate-200">Justificativa Técnica: </strong>
                    {selectedMechanism.practicalExample.justification}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Base: <span className="text-slate-300">{selectedMechanism.practicalExample.committeeRef}</span>
                  </div>
                </div>
              </div>

              {/* Advisor Tip & Danger Box */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 text-sm text-indigo-950">
                  <div className="flex items-center gap-2 font-bold text-indigo-900 mb-1">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    Dica de Ouro do Assessor Científico:
                  </div>
                  <p className="text-xs sm:text-sm text-indigo-900/90 leading-relaxed">
                    {selectedMechanism.advisorTip}
                  </p>
                </div>

                {selectedMechanism.dangerAlert && (
                  <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-sm text-amber-950">
                    <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Atenção / Ponto Crítico:
                    </div>
                    <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                      {selectedMechanism.dangerAlert}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SPECIAL DEDICATED CARD: O CONFLITO REGRA VS FENÓTIPO */
        <div className="bg-white rounded-2xl border-2 border-amber-300 shadow-md p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 mb-2 border border-amber-300">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                Destaque do Treinamento de Fernanda Rei
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                O Conflito: Uma Regra Pode Anular a Dedução por Fenótipo!
              </h3>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Entenda o que aconteceu no vídeo quando uma regra forçada de Ampicilina impediu o AES de deduzir pelo fenótipo.
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-amber-300 text-xs font-mono font-bold">
              prioridade = Regra &gt; Fenótipo
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side: The trap */}
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 text-sm space-y-3">
              <h4 className="font-bold text-rose-900 flex items-center gap-2 text-base">
                <AlertTriangle className="w-5 h-5 text-rose-600" /> A Armadilha Técnica
              </h4>
              <p className="text-rose-800 text-xs sm:text-sm leading-relaxed">
                Durante o teste prático na reunião, Fernanda criou uma regra customizada para Ampicilina em <em>Enterococcus</em>.
                Porém, a regra não contemplava a interpretação do isolado. O resultado?
              </p>
              <div className="p-3 bg-white rounded-lg border border-rose-200 text-xs text-rose-900 font-medium">
                «O VITEK encontrou a regra, viu que o resultado não atendia ao critério da regra e <strong>PAROU ali</strong>. Ele não avançou para tentar deduzir por fenótipo, porque a regra 'travou' aquela droga!»
              </div>
              <p className="text-xs text-rose-700">
                Portanto, <strong>a regra condicional tem precedência</strong> e anula a dedução fenotípica natural daquela mesma molécula.
              </p>
            </div>

            {/* Right side: The solution */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-sm space-y-3">
              <h4 className="font-bold text-emerald-900 flex items-center gap-2 text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Como o Assessor Deve Orientar
              </h4>
              <div className="space-y-2 text-xs sm:text-sm text-emerald-900">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">1.</span>
                  <span>
                    <strong>Se a dedução já for contemplada pelo comitê via Fenótipo:</strong> Não crie regras manuais forçadas! Apenas garanta que o Ponto de Corte (concentração crítica) está configurado no AES.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">2.</span>
                  <span>
                    <strong>Se for criar uma Regra Customizada:</strong> Lembre-se de configurar tanto a condição de sensibilidade quanto a de resistência (SE DrogA = S então DrogB = S / SE DrogA = R então DrogB = R), se o objetivo for refletir o laudo completo.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">3.</span>
                  <span>
                    <strong>Para limpar conflitos:</strong> Inative regras manuais que estejam disputando a mesma droga com o fenótipo expertizado.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Golden Rule Summary Table */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
            <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" /> Comparativo Rápido de Decisão
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600 font-semibold bg-slate-100">
                    <th className="p-2.5">Recurso</th>
                    <th className="p-2.5">O que exige no VITEK?</th>
                    <th className="p-2.5">Onde o AES busca respaldo?</th>
                    <th className="p-2.5">Risco de Falha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-2.5 font-semibold text-blue-700">Regra de Antibiótico Equivalente</td>
                    <td className="p-2.5">Regra ativa + Droga marcada no cartão</td>
                    <td className="p-2.5">Tabelas de regras CLSI / EUCAST / BrCAST</td>
                    <td className="p-2.5 text-amber-700 font-medium">Baixo se respeitar o comitê oficial</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-indigo-700">Dedução pelo Fenótipo</td>
                    <td className="p-2.5">Ponto de Corte cadastrado + Droga marcada</td>
                    <td className="p-2.5">Gráfico do AES + Distribuição de MIC</td>
                    <td className="p-2.5 text-amber-700 font-medium">Falha se faltar ponto de corte no AES</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-rose-700">Dedução sem Expertização</td>
                    <td className="p-2.5">Caixa ativada no menu AES</td>
                    <td className="p-2.5">Nenhum (Microrganismo fora da base)</td>
                    <td className="p-2.5 text-rose-700 font-bold">ALTÍSSIMO (Desaconselhado na rotina)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
