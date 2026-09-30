import React, { useState } from 'react';
import { QUICK_FLASHCARDS } from '../data/deductionContent';
import { X, ArrowLeft, ArrowRight, RotateCw, Sparkles, CheckCircle2 } from 'lucide-react';

interface FlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlashcardsModal: React.FC<FlashcardsModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentCard = QUICK_FLASHCARDS[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % QUICK_FLASHCARDS.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + QUICK_FLASHCARDS.length) % QUICK_FLASHCARDS.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Modal Top */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="font-bold text-sm">Flashcards de Fixação Rápida</h3>
              <p className="text-[11px] text-slate-400">
                Cartão {currentIndex + 1} de {QUICK_FLASHCARDS.length} • {currentCard.category}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Canvas */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col items-center justify-center min-h-[300px] text-center">
          <div
            onClick={handleFlip}
            className="w-full h-full min-h-[260px] p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/70 border-2 border-dashed border-blue-200 hover:border-blue-400 cursor-pointer flex flex-col items-center justify-center transition-all duration-200 shadow-sm relative group"
          >
            <div className="absolute top-3 left-4 flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                {currentCard.tag}
              </span>
            </div>

            <div className="absolute top-3 right-4 text-[11px] text-slate-400 flex items-center gap-1 font-medium group-hover:text-blue-600 transition-colors">
              <RotateCw className="w-3.5 h-3.5" /> Clique para virar
            </div>

            <div className="my-auto space-y-3">
              {!isFlipped ? (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Pergunta Técnica
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug max-w-md">
                    {currentCard.front}
                  </h4>
                </div>
              ) : (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center justify-center gap-1 mb-2">
                    <CheckCircle2 className="w-4 h-4" /> Resposta Técnica & Conduta
                  </span>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium max-w-md">
                    {currentCard.back}
                  </p>
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-400 mt-2">
              {isFlipped ? 'Clique para ver a pergunta novamente' : 'Clique para ver a explicação técnica'}
            </div>
          </div>
        </div>

        {/* Modal Bottom Controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-slate-300 text-slate-700 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Anterior
          </button>

          <button
            onClick={handleFlip}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
          >
            {isFlipped ? 'Ver Pergunta' : 'Ver Resposta'}
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-sm"
          >
            Próximo <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
