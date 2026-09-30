import React from 'react';
import {
  Printer,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Info,
  Layers,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface PrintCardViewProps {
  onPrint: () => void;
}

export const PrintCardView: React.FC<PrintCardViewProps> = ({ onPrint }) => {
  return (
    <div className="space-y-6">
      {/* Top Banner with Print Button */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Ficha de Bolso & Campo
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Card Didático Sintético: Dedução no VITEK® 2 (AES)
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Formato pronto para impressão e consulta rápida em visitas técnicas e treinamentos laboratoriais.
          </p>
        </div>

        <button
          onClick={onPrint}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" /> Imprimir Ficha de Campo
        </button>
      </div>

      {/* Printable Sheet Area */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-slate-200 shadow-sm space-y-8 print:p-0 print:border-none print:shadow-none">
        {/* Header Strip */}
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
          <div>
            <span className="text-xs font-extrabold tracking-wider uppercase text-blue-700">
              bioMérieux • Suporte Científico & Clínico
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              GUIA RÁPIDO: DEDUÇÃO DE ANTIBIÓTICOS NO VITEK® 2
            </h2>
            <div className="text-xs text-slate-500 font-medium">
              Advanced Expert System (AES) • BrCAST / EUCAST / CLSI
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-slate-900 text-white font-mono text-xs font-bold rounded-lg">
              VERSÃO ASSESSORIA
            </span>
          </div>
        </div>

        {/* Core Matrix */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            1. Matriz de Decisão dos 3 Tipos de Dedução
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1 */}
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-600 text-white">Tipo 1</span>
                <span className="text-[11px] font-bold text-emerald-700">Recomendado</span>
              </div>
              <h5 className="font-bold text-sm text-slate-900">Antibiótico Equivalente</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Baseado em <strong>regras definidas</strong> pelo comitê. Droga representativa deduz a família (ex: Ampicilina deduz Amoxicilina e Ampi/Sulb em Enterococcus).
              </p>
              <div className="text-[11px] text-blue-900 font-medium bg-blue-100/70 p-2 rounded-lg">
                <strong>Pré-requisito:</strong> Regra ativa + Droga marcada em Config. Geral de TSA do cartão.
              </div>
            </div>

            {/* Box 2 */}
            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">Tipo 2</span>
                <span className="text-[11px] font-bold text-emerald-700">Recomendado</span>
              </div>
              <h5 className="font-bold text-sm text-slate-900">Dedução por Fenótipo</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Baseado na <strong>distribuição de MIC</strong> e gráfico fenotípico do AES. O sistema expertiza o fenótipo de resistência e libera as correlatas.
              </p>
              <div className="text-[11px] text-indigo-900 font-medium bg-indigo-100/70 p-2 rounded-lg">
                <strong>OBRIGATÓRIO:</strong> Ponto de Corte (concentração crítica) cadastrado no AES!
              </div>
            </div>

            {/* Box 3 */}
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-600 text-white">Tipo 3</span>
                <span className="text-[11px] font-bold text-rose-700">Desaconselhado</span>
              </div>
              <h5 className="font-bold text-sm text-slate-900">Sem Expertização</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedução mecânica para organismos sem suporte na base biológica do AES (Status Roxo).
              </p>
              <div className="text-[11px] text-rose-950 font-bold bg-rose-100/80 p-2 rounded-lg">
                <strong>Alerta GCS:</strong> Manter desmarcado na rotina diagnóstica!
              </div>
            </div>
          </div>
        </div>

        {/* 5 Golden Rules for the Field Advisor */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            2. As 5 Regras de Ouro do Assessor Científico
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-semibold">1. Nunca edite regras originais de comitê</strong>
              <p className="text-slate-600">
                Se precisar criar ou adaptar uma regra, sempre utilize a opção <em>"Copiar uma regra existente"</em>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-semibold">2. A Regra tem precedência sobre o Fenótipo</strong>
              <p className="text-slate-600">
                Se uma regra para aquela droga existir e não for satisfeita, o AES não recorrerá ao fenótipo!
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-semibold">3. Ponto de Corte é a chave da dedução fenotípica</strong>
              <p className="text-slate-600">
                Droga marcada no cartão mas sem ponto de corte no menu "Concentrações Críticas" não sairá no laudo.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-semibold">4. O VITEK barra premissas incoerentes</strong>
              <p className="text-slate-600">
                Não é possível forçar extrapolações sem respaldo científico (ex: Amox/Clav deduzindo Ampicilina em Enterobacterales).
              </p>
            </div>
          </div>
        </div>

        {/* Workflow Checklist Summary */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 text-xs">
          <div className="font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
            <FileCheck className="w-4 h-4" /> Checklist Rápido no Laboratório
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-slate-300">
            <div>
              <span className="text-blue-300 font-bold block mb-0.5">Etapa 1:</span>
              Ativar dedução no painel inicial do AES
            </div>
            <div>
              <span className="text-blue-300 font-bold block mb-0.5">Etapa 2:</span>
              Selecionar as drogas no cartão (Config TSA)
            </div>
            <div>
              <span className="text-blue-300 font-bold block mb-0.5">Etapa 3:</span>
              Verificar se regra ou ponto de corte está ativo
            </div>
            <div>
              <span className="text-blue-300 font-bold block mb-0.5">Etapa 4:</span>
              Reanalisar e auditar no Relatório AES
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
