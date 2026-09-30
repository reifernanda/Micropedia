import React from 'react';
import { Lightbulb, ShieldAlert, ArrowRight, CheckCircle, Database } from 'lucide-react';

interface OverviewHeroProps {
  onSelectCategory: (tab: string) => void;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({ onSelectCategory }) => {
  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-8 px-4 sm:px-6 lg:px-8 rounded-2xl mb-8 border border-slate-700/60 shadow-xl">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-700/80">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <Lightbulb className="w-3.5 h-3.5 text-blue-400" />
              Conceito Fundamental de Expertização
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              O que é a Dedução de Antibióticos no VITEK® 2?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              É a capacidade do software VITEK® 2 (via AES – <span className="text-blue-300 font-medium">Advanced Expert System</span>)
              de reportar no laudo clínico a sensibilidade de antibióticos que <strong className="text-white">não foram testados fisicamente</strong> no
              cartão de TSA, utilizando regras científicas de equivalência de comitês ou o fenótipo de resistência identificado.
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-xl max-w-sm shrink-0">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Por que isso é um "Luxo"?
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              «Diminui o ruído entre laboratório e médico! Em vez do médico ligar perguntando porque a droga não saiu, o laudo já sai completo e fundamentado pelo BrCAST/EUCAST.»
            </p>
            <div className="mt-2 text-[11px] text-slate-400 font-medium">
              — Fernanda Rei, Apresentação Técnica bioMérieux
            </div>
          </div>
        </div>

        {/* 3 Core Deduction Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Pillar 1 */}
          <div
            onClick={() => onSelectCategory('cards')}
            className="group bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500/50 p-4 rounded-xl cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Tipo 1
              </span>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Recomendado
              </span>
            </div>
            <h3 className="font-semibold text-slate-100 group-hover:text-blue-300 transition-colors">
              Antibiótico Equivalente
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Baseado em regras formais (ex: Regra 662). Uma droga marcadora (ex: Ampicilina) deduz as correlatas da mesma família (Amox, Ampi/Sulbactam).
            </p>
            <div className="mt-3 flex items-center text-xs text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
              Ver detalhes do comitê <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Pillar 2 */}
          <div
            onClick={() => onSelectCategory('cards')}
            className="group bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 p-4 rounded-xl cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Tipo 2
              </span>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Recomendado
              </span>
            </div>
            <h3 className="font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors">
              Dedução por Fenótipo
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Baseado na distribuição de MIC e no gráfico do AES. <strong className="text-slate-100">Exige Ponto de Corte</strong> cadastrado para traçar a linha e liberar o laudo.
            </p>
            <div className="mt-3 flex items-center text-xs text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
              Entender o gráfico AES <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Pillar 3 */}
          <div
            onClick={() => onSelectCategory('cards')}
            className="group bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-rose-500/50 p-4 rounded-xl cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Tipo 3
              </span>
              <span className="text-xs text-rose-400 flex items-center gap-1 font-medium">
                <ShieldAlert className="w-3.5 h-3.5" /> Não Recomendado
              </span>
            </div>
            <h3 className="font-semibold text-slate-100 group-hover:text-rose-300 transition-colors">
              Sem Expertização
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Dedução cega para microrganismos fora da base AES (status roxo). Alto risco biológico; orientação formal de manter desmarcado.
            </p>
            <div className="mt-3 flex items-center text-xs text-rose-400 font-medium group-hover:translate-x-1 transition-transform">
              Ver alertas de segurança <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>

        {/* Advisor Workflow Checklist Strip */}
        <div className="mt-6 pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400" />
            <span>Fluxo de Ativação: <strong>AES Principal</strong> &gt; <strong>Config. TSA (Cartão)</strong> &gt; <strong>Regra/Breakpoint</strong> &gt; <strong>Reanálise</strong></span>
          </div>
          <div className="text-slate-300">
            Comitês Suportados: <span className="text-blue-300 font-semibold">BrCAST / EUCAST / CLSI</span>
          </div>
        </div>
      </div>
    </div>
  );
};
