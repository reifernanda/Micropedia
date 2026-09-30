/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { OverviewHero } from './components/OverviewHero';
import { DidacticCards } from './components/DidacticCards';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { StepByStepGuide } from './components/StepByStepGuide';
import { AdvisorChecklist } from './components/AdvisorChecklist';
import { PrintCardView } from './components/PrintCardView';
import { FlashcardsModal } from './components/FlashcardsModal';
import { BookOpen, ShieldCheck, HeartPulse, GraduationCap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('cards');
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenFlashcards={() => setIsFlashcardsOpen(true)}
        onPrint={handlePrint}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Conceptual Overview Banner */}
        <OverviewHero onSelectCategory={(tab) => setActiveTab(tab)} />

        {/* Dynamic View Sections */}
        {activeTab === 'cards' && <DidacticCards />}
        {activeTab === 'simulator' && <InteractiveSimulator />}
        {activeTab === 'workflow' && <StepByStepGuide />}
        {activeTab === 'checklist' && <AdvisorChecklist />}
        {activeTab === 'guia-rapido' && <PrintCardView onPrint={handlePrint} />}
      </main>

      {/* Interactive Flashcards Study Tool */}
      <FlashcardsModal
        isOpen={isFlashcardsOpen}
        onClose={() => setIsFlashcardsOpen(false)}
      />

      {/* Footer & Reference Strip */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              V2
            </div>
            <span className="font-semibold text-slate-700">
              De Frente com o VITEK® • Módulo de Dedução de Antibióticos
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600">
            <span className="flex items-center gap-1">
              <GraduationCap className="w-4 h-4 text-blue-500" />
              Treinamento Interno de Assessoria Científica
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Base: BrCAST / EUCAST / CLSI M100
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              Advanced Expert System (AES)
            </span>
          </div>

          <div className="text-slate-400 text-center md:text-right">
            bioMérieux Brasil • Suporte Técnico e Científico
          </div>
        </div>
      </footer>
    </div>
  );
}
