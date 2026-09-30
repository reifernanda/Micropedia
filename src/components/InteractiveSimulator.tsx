import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  AlertCircle,
  Settings2,
  RefreshCw,
  FileText,
  HelpCircle,
  Sliders,
  Database
} from 'lucide-react';

export const InteractiveSimulator: React.FC = () => {
  // Case selection: 'enterococcus' | 'escherichia'
  const [selectedScenario, setSelectedScenario] = useState<'enterococcus' | 'escherichia'>('enterococcus');

  // Case 1 states (Enterococcus faecalis - AST-P637)
  const [ampicillinResult, setAmpicillinResult] = useState<'S' | 'R'>('S');
  const [levofloxacinResult, setLevofloxacinResult] = useState<'S' | 'R'>('S');
  const [rule662Active, setRule662Active] = useState<boolean>(true);
  const [customCiproRuleActive, setCustomCiproRuleActive] = useState<boolean>(true);

  // Case 2 states (E. coli - AST-N408)
  const [hasImipenemBreakpoint, setHasImipenemBreakpoint] = useState<boolean>(true);
  const [hasTobramycinBreakpoint, setHasTobramycinBreakpoint] = useState<boolean>(false);
  const [amoxClavRuleAttempt, setAmoxClavRuleAttempt] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* Simulator intro header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <Activity className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Laboratório Virtual VITEK® 2
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Simulador de Laudos e Regras do AES
          </h3>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Altere os parâmetros de configuração e MICs para ver em tempo real como o VITEK® 2 constrói o laudo e gera o Relatório de Detalhes do AES.
          </p>
        </div>

        {/* Scenario Toggle */}
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium self-start md:self-auto">
          <button
            onClick={() => setSelectedScenario('enterococcus')}
            className={`px-3.5 py-2 rounded-lg transition-all ${
              selectedScenario === 'enterococcus'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Caso 1: AST-P637 (Enterococcus)
          </button>
          <button
            onClick={() => setSelectedScenario('escherichia')}
            className={`px-3.5 py-2 rounded-lg transition-all ${
              selectedScenario === 'escherichia'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Caso 2: AST-N408 (E. coli)
          </button>
        </div>
      </div>

      {/* Simulator Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Controls & Configuration (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-blue-600" />
                Painel de Configuração do Assessor
              </h4>
              <span className="text-xs text-slate-400 font-mono">
                {selectedScenario === 'enterococcus' ? 'Cartão AST-P637' : 'Cartão AST-N408'}
              </span>
            </div>

            {selectedScenario === 'enterococcus' ? (
              /* Enterococcus Controls */
              <div className="space-y-4">
                {/* Tested MIC Controls */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    1. Resultado da Ampicilina Testada no Cartão:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setAmpicillinResult('S')}
                      className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
                        ampicillinResult === 'S'
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-800 ring-2 ring-emerald-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      MIC &lt;= 2 (Sensível)
                    </button>
                    <button
                      onClick={() => setAmpicillinResult('R')}
                      className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
                        ampicillinResult === 'R'
                          ? 'bg-rose-50 border-rose-400 text-rose-800 ring-2 ring-rose-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      MIC &gt;= 16 (Resistente)
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    2. Resultado do Levofloxacino Testado:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setLevofloxacinResult('S')}
                      className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
                        levofloxacinResult === 'S'
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-800 ring-2 ring-emerald-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      MIC &lt;= 1 (Sensível)
                    </button>
                    <button
                      onClick={() => setLevofloxacinResult('R')}
                      className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
                        levofloxacinResult === 'R'
                          ? 'bg-rose-50 border-rose-400 text-rose-800 ring-2 ring-rose-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      MIC &gt;= 8 (Resistente)
                    </button>
                  </div>
                </div>

                {/* Rule Toggles */}
                <div className="pt-3 border-t border-slate-200 space-y-3">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    3. Regras Ativas no AES:
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70">
                    <input
                      type="checkbox"
                      checked={rule662Active}
                      onChange={(e) => setRule662Active(e.target.checked)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <div className="text-xs">
                      <strong className="text-slate-800 block">Regra Padrão 662 (EUCAST)</strong>
                      <span className="text-slate-500">
                        Ampicilina deduz Amoxicilina e Ampicilina/Sulbactam para Enterococcus.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70">
                    <input
                      type="checkbox"
                      checked={customCiproRuleActive}
                      onChange={(e) => setCustomCiproRuleActive(e.target.checked)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <div className="text-xs">
                      <strong className="text-slate-800 block">Regra Customizada (Criada por Cópia)</strong>
                      <span className="text-slate-500">
                        Levofloxacino deduz Ciprofloxacino (Regra nº 1242).
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            ) : (
              /* E. coli Controls */
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  Isolado: <strong>Escherichia coli</strong> em urina no cartão Gram-Negativo AST-N408. Drogas a deduzir marcadas na Configuração Geral de TSA: Imipenem, Tobramicina e Amoxicilina.
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Pontos de Corte Cadastrados no AES:
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70">
                    <input
                      type="checkbox"
                      checked={hasImipenemBreakpoint}
                      onChange={(e) => setHasImipenemBreakpoint(e.target.checked)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <div className="text-xs">
                      <strong className="text-slate-800 block">Ponto de Corte: Imipenem (IPM)</strong>
                      <span className="text-slate-500">Concentração Crítica cadastrada no AES: S &lt;= 2 / R &gt; 4 mg/L.</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70">
                    <input
                      type="checkbox"
                      checked={hasTobramycinBreakpoint}
                      onChange={(e) => setHasTobramycinBreakpoint(e.target.checked)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <div className="text-xs">
                      <strong className="text-slate-800 block">Ponto de Corte: Tobramicina (NN)</strong>
                      <span className="text-slate-500">
                        {hasTobramycinBreakpoint
                          ? 'Configurado agora no AES (S <= 2 / R > 4 mg/L).'
                          : 'Em branco / ausente (como no início do teste da Fernanda no vídeo).'}
                      </span>
                    </div>
                  </label>
                </div>

                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Tentativa de Regra com Amox/Clav:
                  </label>
                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/60 border border-amber-200 cursor-pointer hover:bg-amber-50">
                    <input
                      type="checkbox"
                      checked={amoxClavRuleAttempt}
                      onChange={(e) => setAmoxClavRuleAttempt(e.target.checked)}
                      className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <div className="text-xs">
                      <strong className="text-amber-900 block">Tentar Regra: Amox/Clav deduzindo Ampicilina</strong>
                      <span className="text-amber-700">
                        Simula a tentativa da assessora de forçar regra de Amox/Clav para Enterobacterales.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Educational Observation Box */}
          <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 text-xs text-slate-700 space-y-1.5">
            <div className="font-bold text-blue-900 flex items-center gap-1.5">
              <Database className="w-4 h-4 text-blue-600" />
              Observação Técnica para o Assessor:
            </div>
            {selectedScenario === 'enterococcus' ? (
              <p className="leading-relaxed">
                Repare que a Ampicilina deduz com base na <strong>Regra 662 do EUCAST</strong>. O Ciprofloxacino entra porque criamos uma regra customizada usando o <strong>Levofloxacino</strong>. Se você mudar a interpretação para Resistente, o laudo reportará de acordo com o critério da regra!
              </p>
            ) : (
              <p className="leading-relaxed">
                Observe o Imipenem e a Tobramicina: eles dependem estritamente de haver <strong>Ponto de Corte</strong> cadastrado para que o AES trace o limite no gráfico fenotípico. Sem o ponto de corte, a dedução por fenótipo não dispara!
              </p>
            )}
          </div>
        </div>

        {/* Right column: Simulated VITEK 2 Report (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden font-sans">
            {/* VITEK 2 Software Header Banner */}
            <div className="bg-slate-800 px-5 py-3 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold tracking-wider uppercase text-slate-200">
                  Simulação de Tela: Relatório de Detalhes AES (VITEK® 2)
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span>Status:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Consistente
                </span>
              </div>
            </div>

            {/* Isolate Header info */}
            <div className="p-4 bg-slate-800/40 border-b border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">ID do Acesso:</span>
                <span className="font-mono font-bold text-slate-200">
                  {selectedScenario === 'enterococcus' ? '4024249' : '4051950'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Microrganismo:</span>
                <strong className="text-blue-300 italic">
                  {selectedScenario === 'enterococcus' ? 'Enterococcus faecalis' : 'Escherichia coli'}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Cartão TSA:</span>
                <span className="font-mono text-slate-300">
                  {selectedScenario === 'enterococcus' ? 'AST-P637' : 'AST-N408'}
                </span>
              </div>
            </div>

            {/* AST Result Table Simulation */}
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Quadro de Antibióticos e Interpretações
                </span>
                <span className="text-[11px] text-blue-400">* = Antibiótico Deduzido no Laudo</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-800/80 text-slate-400 font-semibold uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">Status</th>
                      <th className="p-2.5">Antibiótico</th>
                      <th className="p-2.5">MIC</th>
                      <th className="p-2.5">INT</th>
                      <th className="p-2.5">Origem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {selectedScenario === 'enterococcus' ? (
                      <>
                        {/* Tested Ampicillin */}
                        <tr className="bg-slate-900/50">
                          <td className="p-2.5 text-slate-400">Testado</td>
                          <td className="p-2.5 font-sans font-semibold text-slate-200">Ampicilina</td>
                          <td className="p-2.5">{ampicillinResult === 'S' ? '<= 2' : '>= 16'}</td>
                          <td className="p-2.5">
                            <span className={`px-2 py-0.5 rounded font-bold ${ampicillinResult === 'S' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                              {ampicillinResult}
                            </span>
                          </td>
                          <td className="p-2.5 font-sans text-slate-400 text-[11px]">Cartão P637</td>
                        </tr>

                        {/* Deduced Amoxicillin */}
                        {rule662Active && ampicillinResult === 'S' && (
                          <tr className="bg-blue-950/30 text-blue-200">
                            <td className="p-2.5 text-blue-400 font-bold">* Deduzido</td>
                            <td className="p-2.5 font-sans font-bold text-blue-300">* Amoxicilina</td>
                            <td className="p-2.5 text-slate-400">-</td>
                            <td className="p-2.5">
                              <span className="px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300">
                                S
                              </span>
                            </td>
                            <td className="p-2.5 font-sans text-blue-300 text-[11px]">Regra 662 (AMP)</td>
                          </tr>
                        )}

                        {/* Deduced Ampicillin/Sulbactam */}
                        {rule662Active && ampicillinResult === 'S' && (
                          <tr className="bg-blue-950/30 text-blue-200">
                            <td className="p-2.5 text-blue-400 font-bold">* Deduzido</td>
                            <td className="p-2.5 font-sans font-bold text-blue-300">* Ampicilina/Sulbactam</td>
                            <td className="p-2.5 text-slate-400">-</td>
                            <td className="p-2.5">
                              <span className="px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300">
                                S
                              </span>
                            </td>
                            <td className="p-2.5 font-sans text-blue-300 text-[11px]">Regra 662 (AMP)</td>
                          </tr>
                        )}

                        {/* Tested Levofloxacin */}
                        <tr className="bg-slate-900/50">
                          <td className="p-2.5 text-slate-400">Testado</td>
                          <td className="p-2.5 font-sans font-semibold text-slate-200">Levofloxacino</td>
                          <td className="p-2.5">{levofloxacinResult === 'S' ? '<= 1' : '>= 8'}</td>
                          <td className="p-2.5">
                            <span className={`px-2 py-0.5 rounded font-bold ${levofloxacinResult === 'S' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                              {levofloxacinResult}
                            </span>
                          </td>
                          <td className="p-2.5 font-sans text-slate-400 text-[11px]">Cartão P637</td>
                        </tr>

                        {/* Deduced Ciprofloxacin */}
                        {customCiproRuleActive && (
                          <tr className="bg-indigo-950/30 text-indigo-200">
                            <td className="p-2.5 text-indigo-400 font-bold">* Deduzido</td>
                            <td className="p-2.5 font-sans font-bold text-indigo-300">* Ciprofloxacino</td>
                            <td className="p-2.5 text-slate-400">-</td>
                            <td className="p-2.5">
                              <span className={`px-2 py-0.5 rounded font-bold ${levofloxacinResult === 'S' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                                {levofloxacinResult}
                              </span>
                            </td>
                            <td className="p-2.5 font-sans text-indigo-300 text-[11px]">Regra 1242 (LEV)</td>
                          </tr>
                        )}
                      </>
                    ) : (
                      <>
                        {/* E. coli: Norfloxacin tested */}
                        <tr className="bg-slate-900/50">
                          <td className="p-2.5 text-slate-400">Testado</td>
                          <td className="p-2.5 font-sans font-semibold text-slate-200">Norfloxacino</td>
                          <td className="p-2.5">&gt; 16</td>
                          <td className="p-2.5"><span className="px-2 py-0.5 rounded font-bold bg-rose-500/20 text-rose-300">R</span></td>
                          <td className="p-2.5 font-sans text-slate-400 text-[11px]">Cartão N408</td>
                        </tr>

                        {/* Piperacillin/Tazo tested */}
                        <tr className="bg-slate-900/50">
                          <td className="p-2.5 text-slate-400">Testado</td>
                          <td className="p-2.5 font-sans font-semibold text-slate-200">Piperacilina/Tazobactam</td>
                          <td className="p-2.5">&lt;= 4</td>
                          <td className="p-2.5"><span className="px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300">S</span></td>
                          <td className="p-2.5 font-sans text-slate-400 text-[11px]">Cartão N408</td>
                        </tr>

                        {/* Imipenem Deduced by Phenotype */}
                        {hasImipenemBreakpoint && (
                          <tr className="bg-emerald-950/30 text-emerald-200">
                            <td className="p-2.5 text-emerald-400 font-bold">* Deduzido</td>
                            <td className="p-2.5 font-sans font-bold text-emerald-300">* Imipenem</td>
                            <td className="p-2.5 text-slate-400">-</td>
                            <td className="p-2.5"><span className="px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300">S</span></td>
                            <td className="p-2.5 font-sans text-emerald-300 text-[11px]">Fenótipo (Ponto de Corte OK)</td>
                          </tr>
                        )}

                        {/* Tobramycin Deduced by Phenotype */}
                        {hasTobramycinBreakpoint ? (
                          <tr className="bg-emerald-950/30 text-emerald-200">
                            <td className="p-2.5 text-emerald-400 font-bold">* Deduzido</td>
                            <td className="p-2.5 font-sans font-bold text-emerald-300">* Tobramicina</td>
                            <td className="p-2.5 text-slate-400">-</td>
                            <td className="p-2.5"><span className="px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300">S</span></td>
                            <td className="p-2.5 font-sans text-emerald-300 text-[11px]">Fenótipo (Ponto de Corte OK)</td>
                          </tr>
                        ) : (
                          <tr className="bg-slate-900/30 text-slate-500 italic">
                            <td className="p-2.5 text-slate-500">Ausente</td>
                            <td className="p-2.5 font-sans">Tobramicina</td>
                            <td className="p-2.5">-</td>
                            <td className="p-2.5">-</td>
                            <td className="p-2.5 font-sans text-rose-400 text-[11px]">Falta Ponto de Corte no AES!</td>
                          </tr>
                        )}

                        {/* Amoxicillin Attempt with Amox/Clav */}
                        {amoxClavRuleAttempt && (
                          <tr className="bg-rose-950/40 text-rose-300">
                            <td className="p-2.5 text-rose-400 font-bold">REJEITADO</td>
                            <td className="p-2.5 font-sans font-bold line-through">Amoxicilina</td>
                            <td className="p-2.5">-</td>
                            <td className="p-2.5">-</td>
                            <td className="p-2.5 font-sans text-rose-300 text-[11px]">BrCAST rejeita premissa Amox/Clav</td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Deduction Detail Footer (As seen in the official AES report in the video) */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1">
                  Seção de Auditoria: Deduções de Antibióticos (AES Report)
                </div>
                {selectedScenario === 'enterococcus' ? (
                  <div className="space-y-1 text-slate-300 font-mono text-[11px]">
                    {rule662Active && ampicillinResult === 'S' && (
                      <div className="flex justify-between">
                        <span>Amoxicilina &larr; Ampicilina</span>
                        <span className="text-blue-400">Regra de Dedução nº 662 (EUCAST)</span>
                      </div>
                    )}
                    {rule662Active && ampicillinResult === 'S' && (
                      <div className="flex justify-between">
                        <span>Ampicilina/Sulbactam &larr; Ampicilina</span>
                        <span className="text-blue-400">Regra de Dedução nº 662 (EUCAST)</span>
                      </div>
                    )}
                    {customCiproRuleActive && (
                      <div className="flex justify-between">
                        <span>Ciprofloxacino &larr; Levofloxacino</span>
                        <span className="text-indigo-400">Regra Customizada nº 1242</span>
                      </div>
                    )}
                    {!rule662Active && !customCiproRuleActive && (
                      <div className="text-slate-500 italic">Nenhuma dedução ativa configurada.</div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-1 text-slate-300 font-mono text-[11px]">
                    {hasImipenemBreakpoint && (
                      <div className="flex justify-between">
                        <span>Imipenem</span>
                        <span className="text-emerald-400">DEDUÇÃO POR FENÓTIPO (AES Expert)</span>
                      </div>
                    )}
                    {hasTobramycinBreakpoint ? (
                      <div className="flex justify-between">
                        <span>Tobramicina</span>
                        <span className="text-emerald-400">DEDUÇÃO POR FENÓTIPO (AES Expert)</span>
                      </div>
                    ) : (
                      <div className="text-rose-400 italic">
                        Tobramicina: não deduzida devido à ausência de Concentração Crítica no AES.
                      </div>
                    )}
                    {amoxClavRuleAttempt && (
                      <div className="text-amber-400 italic">
                        Alerta: Regra não executada. Comitê exige Ampicilina como droga preditora primária.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
