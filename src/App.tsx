import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { QuoteCard } from './components/QuoteCard';
import { WakeUpButton } from './components/WakeUpButton';
import { CategoryFilter } from './components/CategoryFilter';
import { FavoritesModal } from './components/FavoritesModal';
import { DialectDictionaryModal } from './components/DialectDictionaryModal';
import { LaunchGuideModal } from './components/LaunchGuideModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { OfflineIndicator } from './components/OfflineIndicator';
import { QUOTES, Quote } from './data/quotes';
import { useFavorites } from './hooks/useFavorites';
import { Sparkles, Shuffle, History, Volume2, ShieldAlert } from 'lucide-react';

const STREAK_KEY = 'jungshin_charira_streak_v1';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSpice, setSelectedSpice] = useState<number>(0); // 0: all
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);
  const [isCardShaking, setIsCardShaking] = useState<boolean>(false);
  const [recentQuotes, setRecentQuotes] = useState<Quote[]>([]);

  // Modals state
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [isLaunchGuideOpen, setIsLaunchGuideOpen] = useState(false);

  // Daily Wake-up Counter state
  const [wakeCount, setWakeCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STREAK_KEY);
      if (saved) return parseInt(saved, 10) || 0;
    } catch {
      // Ignore
    }
    return 0;
  });

  // Favorites Hook
  const { favoriteIds, isFavorite, toggleFavorite, removeFavorite, clearAllFavorites } =
    useFavorites();

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((text: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Filtered pool of quotes
  const filteredQuotes = useMemo(() => {
    return QUOTES.filter((q) => {
      const matchCategory = selectedCategory === 'all' || q.category === selectedCategory;
      const matchSpice = selectedSpice === 0 || q.spiceLevel === selectedSpice;
      return matchCategory && matchSpice;
    });
  }, [selectedCategory, selectedSpice]);

  // Current active quote
  const currentQuote = useMemo(() => {
    if (filteredQuotes.length === 0) {
      return QUOTES[0];
    }
    return filteredQuotes[currentQuoteIndex % filteredQuotes.length] || filteredQuotes[0];
  }, [filteredQuotes, currentQuoteIndex]);

  // Favorite Quote objects
  const favoriteQuoteObjects = useMemo(() => {
    return QUOTES.filter((q) => favoriteIds.includes(q.id));
  }, [favoriteIds]);

  // Wake up action (Primary button)
  const handleWakeUp = useCallback(() => {
    if (filteredQuotes.length === 0) return;

    // Pick random index different from current
    let nextIdx = Math.floor(Math.random() * filteredQuotes.length);
    if (filteredQuotes.length > 1 && nextIdx === currentQuoteIndex % filteredQuotes.length) {
      nextIdx = (nextIdx + 1) % filteredQuotes.length;
    }

    setCurrentQuoteIndex(nextIdx);
    const newQuote = filteredQuotes[nextIdx];

    // Card shake animation
    setIsCardShaking(true);
    setTimeout(() => setIsCardShaking(false), 400);

    // Track recent quotes
    setRecentQuotes((prev) => {
      const filtered = prev.filter((item) => item.id !== newQuote.id);
      return [newQuote, ...filtered].slice(0, 5);
    });

    // Increment counter
    setWakeCount((prev) => {
      const updated = prev + 1;
      try {
        localStorage.setItem(STREAK_KEY, updated.toString());
      } catch {
        // Ignore
      }
      return updated;
    });
  }, [filteredQuotes, currentQuoteIndex]);

  // Handle favorite toggling with toast
  const handleToggleFavorite = useCallback(
    (id: string) => {
      const newState = toggleFavorite(id);
      if (newState) {
        showToast('내 보관함에 저장되었습니더! ❤️', 'success');
      } else {
        showToast('보관함에서 삭제되었습니더.', 'info');
      }
    },
    [toggleFavorite, showToast]
  );

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1E2923] flex flex-col font-sans">
      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Offline status banner */}
      <OfflineIndicator />

      {/* Header bar */}
      <Header
        favoriteCount={favoriteIds.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenDictionary={() => setIsDictionaryOpen(true)}
        onOpenLaunchGuide={() => setIsLaunchGuideOpen(true)}
      />

      {/* Main Mobile App Frame */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-4 sm:py-6 flex flex-col gap-4">
        {/* Intro Tagline */}
        <div className="text-center space-y-1">
          <p className="text-xs text-[#2D6A4F] font-semibold tracking-wide flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>나태함이 스멀스멀 올라올 땐?</span>
          </p>
          <h2 className="text-lg sm:text-xl font-black text-[#1B4332] tracking-tight">
            버튼 한 번에 정신이 번쩍 드는 사투리 처방전
          </h2>
        </div>

        {/* Category & Spice Selectors */}
        <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-[#E8E2D5] shadow-2xs">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setCurrentQuoteIndex(0);
            }}
            selectedSpice={selectedSpice}
            onSelectSpice={(spice) => {
              setSelectedSpice(spice);
              setCurrentQuoteIndex(0);
            }}
          />
        </div>

        {/* Core Interactive Card */}
        <div className={`w-full transition-transform ${isCardShaking ? 'animate-wake' : ''}`}>
          <QuoteCard
            quote={currentQuote}
            isFavorite={isFavorite(currentQuote.id)}
            onToggleFavorite={handleToggleFavorite}
            onShowToast={showToast}
          />
        </div>

        {/* Primary Action Button: "정신차리라!" */}
        <WakeUpButton onWakeUp={handleWakeUp} count={wakeCount} />

        {/* Sub Controls: Next Shuffle & Random Pick */}
        <div className="flex items-center justify-center gap-4 text-xs text-[#52796F]">
          <button
            type="button"
            onClick={handleWakeUp}
            className="flex items-center gap-1 font-medium hover:text-[#1B4332] transition-colors py-1 px-2 rounded-lg hover:bg-[#EFE9DC]"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>다른 문구 뽑기</span>
          </button>
          <span aria-hidden="true" className="text-stone-300">|</span>
          <button
            type="button"
            onClick={() => setIsDictionaryOpen(true)}
            className="hover:text-[#1B4332] font-medium transition-colors py-1 px-2 rounded-lg hover:bg-[#EFE9DC]"
          >
            <span>사투리 뜻풀이 보기</span>
          </button>
        </div>

        {/* Quick Launch Banner for Solo Founder */}
        <div className="mt-2 p-3.5 rounded-2xl bg-white border border-[#E8E2D5] flex items-center justify-between text-xs">
          <div className="space-y-0.5">
            <p className="font-bold text-[#1B4332] flex items-center gap-1">
              <span>🚀 1인 창업자 출시 준비 완료</span>
            </p>
            <p className="text-[11px] text-stone-500">
              서버비 0원 · PWA 앱 설치 지원 · 브라우저 로컬 저장
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsLaunchGuideOpen(true)}
            className="px-2.5 py-1.5 rounded-lg bg-[#1B4332] text-white font-semibold text-[11px] hover:bg-[#2D6A4F] transition-colors shrink-0"
          >
            배포법 보기
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#E8E2D5] py-4 text-center text-xs text-stone-500">
        <div className="max-w-md mx-auto px-4 flex flex-col items-center gap-1.5">
          <p className="font-medium text-stone-600">
            정신차리라! · 경상도 사투리 1초 멘탈 충전소
          </p>
          <div className="flex items-center gap-3 text-[11px] text-stone-500">
            <span>회원가입 없음</span>
            <span aria-hidden="true">·</span>
            <span>데이터 로컬 저장</span>
            <span aria-hidden="true">·</span>
            <span>홈 화면 PWA 설치 가능</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteQuotes={favoriteQuoteObjects}
        onRemoveFavorite={removeFavorite}
        onClearAll={clearAllFavorites}
        onShowToast={showToast}
      />

      <DialectDictionaryModal
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
      />

      <LaunchGuideModal
        isOpen={isLaunchGuideOpen}
        onClose={() => setIsLaunchGuideOpen(false)}
      />
    </div>
  );
}
