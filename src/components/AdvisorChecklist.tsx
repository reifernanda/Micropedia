import React, { useState } from 'react';
import { ADVISOR_CHECKLIST } from '../data/deductionContent';
import {
  CheckSquare,
  Square,
  AlertCircle,
  HelpCircle,
  Search,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MapPin
} from 'lucide-react';

export const AdvisorChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetAll = () => {
    setCheckedItems({});
  };

  const filteredItems = ADVISOR_CHECKLIST.filter((item) => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  const totalCount = ADVISOR_CHECKLIST.length;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Checklist Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                <CheckSquare className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Guia de Troubleshooting em Campo
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              "Meu antibiótico não foi deduzido no laudo. E agora?"
            </h3>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">
              Checklist de auditoria rápida para assessores científicos investigarem chamados técnicos e dúvidas de clientes em laboratórios de microbiologia.
            </p>
          </div>

          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Limpar Checklist
          </button>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Progresso da Auditoria: {completedCount} de {totalCount} verificados</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500 py-1 font-medium">Filtrar por foco:</span>
          {[
            { id: 'all', label: 'Todos os Itens' },
            { id: 'config', label: 'Configuração Geral' },
            { id: 'ponto_corte', label: 'Pontos de Corte' },
            { id: 'regra', label: 'Regras e Conflitos' },
            { id: 'comite', label: 'Comitê (BrCAST/CLSI)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                filterCategory === cat.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Checklist Interactive List */}
      <div className="space-y-3">
        {filteredItems.map((item, idx) => {
          const isChecked = !!checkedItems[item.id];
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                isChecked
                  ? 'border-emerald-200 bg-emerald-50/20 shadow-none'
                  : 'border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => toggleCheck(item.id)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
                    aria-label="Marcar item"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Square className="w-6 h-6 text-slate-300 hover:text-slate-400" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        item.category === 'ponto_corte'
                          ? 'text-indigo-600'
                          : item.category === 'regra'
                          ? 'text-amber-600'
                          : item.category === 'comite'
                          ? 'text-purple-600'
                          : 'text-blue-600'
                      }`}
                    >
                      Item 0{idx + 1} • {item.category.toUpperCase()}
                    </span>
                    <h4
                      onClick={() => toggleCheck(item.id)}
                      className={`text-base font-semibold cursor-pointer select-none transition-colors ${
                        isChecked ? 'text-slate-500 line-through' : 'text-slate-900'
                      }`}
                    >
                      {item.question}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 shrink-0"
                  aria-label="Expandir detalhes"
                >
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {/* Action and Screen Guidance Drawer */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 bg-slate-50/80 border-t border-slate-100 space-y-3 text-xs text-slate-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <strong className="text-slate-900 font-semibold block mb-1">
                        Ação Recomendada pelo Assessor:
                      </strong>
                      <p className="text-slate-600 leading-relaxed">{item.action}</p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <strong className="text-slate-900 font-semibold flex items-center gap-1 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        Onde verificar no software:
                      </strong>
                      <span className="font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 block">
                        {item.screenTarget}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
