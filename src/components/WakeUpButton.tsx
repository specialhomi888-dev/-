import React from 'react';
import confetti from 'canvas-confetti';
import { Zap } from 'lucide-react';

interface WakeUpButtonProps {
  onWakeUp: () => void;
  count: number;
}

export const WakeUpButton: React.FC<WakeUpButtonProps> = ({ onWakeUp, count }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. Tactile Haptic Vibration
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      try {
        navigator.vibrate([25, 40, 25]);
      } catch {
        // Ignore
      }
    }

    // 2. Confetti Blast Effect
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 35,
        spread: 60,
        origin: { x, y },
        colors: ['#1B4332', '#2D6A4F', '#D4A373', '#FBBF24', '#E76F51'],
        disableForReducedMotion: true,
      });
    } catch {
      // Ignore
    }

    // 3. Callback to pick random quote
    onWakeUp();
  };

  return (
    <div className="w-full flex flex-col items-center gap-2 pt-2 pb-1">
      <button
        type="button"
        onClick={handleClick}
        className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-[#1B4332] via-[#245942] to-[#1B4332] text-[#FDFBF7] font-black text-lg sm:text-xl tracking-tight shadow-xl hover:shadow-2xl hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-3 border border-[#3A7558]/30 group relative overflow-hidden"
      >
        {/* Subtle shine effect */}
        <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />

        <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center shadow-xs shrink-0 group-hover:rotate-12 transition-transform">
          <Zap className="w-5 h-5 fill-current" />
        </div>

        <span className="font-display tracking-normal">
          정신차리라! ⚡
        </span>
      </button>

      {/* Streak / Count micro-metric */}
      <div className="flex items-center gap-1.5 text-xs text-[#52796F]">
        <span>오늘 정신 차린 횟수</span>
        <span aria-hidden="true">·</span>
        <span className="font-bold text-[#1B4332] font-mono tabular-nums">{count}회</span>
      </div>
    </div>
  );
};
