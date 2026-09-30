import React from 'react';
import { Sparkles, Printer, Layers, HelpCircle, Activity, CheckSquare, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenFlashcards: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenFlashcards,
  onPrint
}) => {
  const navItems = [
    { id: 'cards', label: 'Cards Didáticos', icon: Layers },
    { id: 'simulator', label: 'Simulador de Laudos', icon: Activity },
    { id: 'workflow', label: 'Passo a Passo VITEK®', icon: BookOpen },
    { id: 'checklist', label: 'Checklist em Cliente', icon: CheckSquare },
    { id: 'guia-rapido', label: 'Ficha de Campo', icon: HelpCircle }
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand & Identity */}
          <div className="flex items-center space-x-4">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xl tracking-tight shadow-sm text-white">
              V2
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
                  bioMérieux • De Frente com o VITEK®
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">• Material Educativo</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2 mt-0.5">
                Dedução de Antibióticos no VITEK® 2
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium px-2 py-0.5 rounded-full hidden md:inline">
                  Guia do Assessor Científico
                </span>
              </h1>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onOpenFlashcards}
              id="btn-flashcards"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm"
              title="Flashcards didáticos para memorização rápida"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span className="hidden sm:inline">Flashcards Rápidos</span>
              <span className="sm:hidden">Flashcards</span>
            </button>

            <button
              onClick={onPrint}
              id="btn-print"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
              title="Imprimir ou exportar guia de dedução"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span className="hidden md:inline">Imprimir / Salvar</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
