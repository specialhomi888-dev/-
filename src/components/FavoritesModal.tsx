import React, { useState } from 'react';
import { Quote } from '../data/quotes';
import { Volume2, VolumeX, Trash2, Share2, Copy, Bookmark, Search, X } from 'lucide-react';
import { speakDialect, stopSpeaking, isTTSSupported } from '../utils/tts';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteQuotes: Quote[];
  onRemoveFavorite: (id: string) => void;
  onClearAll: () => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favoriteQuotes,
  onRemoveFavorite,
  onClearAll,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = favoriteQuotes.filter((q) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      q.dialect.toLowerCase().includes(query) ||
      q.standard.toLowerCase().includes(query) ||
      q.meaning.toLowerCase().includes(query) ||
      q.categoryLabel.toLowerCase().includes(query)
    );
  });

  const handleSpeak = (quote: Quote) => {
    if (!isTTSSupported()) {
      onShowToast('TTS를 지원하지 않는 브라우저입니다.', 'error');
      return;
    }

    if (playingId === quote.id) {
      stopSpeaking();
      setPlayingId(null);
      return;
    }

    setPlayingId(quote.id);
    speakDialect(quote.dialect, {
      onStart: () => setPlayingId(quote.id),
      onEnd: () => setPlayingId(null),
      onError: (msg) => {
        setPlayingId(null);
        onShowToast(msg, 'error');
      },
    });
  };

  const handleCopy = async (quote: Quote) => {
    const textToCopy = `⚡ [정신차리라!]\n"${quote.dialect}"\n\n📌 표준어: ${quote.standard}\n💡 뜻: ${quote.meaning}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      }
      onShowToast('문구가 복사되었습니더!', 'success');
    } catch {
      onShowToast('복사 실패', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#FBF9F4] rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col shadow-2xl border border-[#E8E2D5] overflow-hidden">
        {/* Grab handle bar for mobile ergonomics */}
        <div className="w-12 h-1.5 bg-[#D6CEBE] rounded-full mx-auto my-2.5 sm:hidden" />

        {/* Modal Header */}
        <div className="px-5 py-3 border-b border-[#E8E2D5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#1B4332]" />
            <h2 className="text-base font-bold text-[#1B4332]">
              내 보관함 ({favoriteQuotes.length})
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {favoriteQuotes.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('보관된 모든 문구를 삭제하시겠습니까?')) {
                    onClearAll();
                    onShowToast('모든 즐겨찾기를 비웠습니다.', 'info');
                  }
                }}
                className="text-xs text-rose-600 hover:text-rose-800 font-medium px-2 py-1 rounded"
              >
                전체 비우기
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-[#EFE9DC]"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search bar inside favorites */}
        {favoriteQuotes.length > 3 && (
          <div className="px-5 pt-3">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="보관한 문구 검색..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#E8E2D5] text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
              />
            </div>
          </div>
        )}

        {/* List Content */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-stone-500 space-y-2">
              <span className="text-3xl block">🌾</span>
              <p className="text-sm font-medium text-stone-700">
                {favoriteQuotes.length === 0
                  ? '아직 아끼는 문구가 없네예!'
                  : '검색된 문구가 없습니다.'}
              </p>
              <p className="text-xs text-stone-500">
                {favoriteQuotes.length === 0
                  ? '마음에 쏙 드는 문구에 하트(❤️)를 눌러 보관해보이소.'
                  : '다른 키워드로 검색해보세요.'}
              </p>
            </div>
          ) : (
            filtered.map((quote) => {
              const isItemPlaying = playingId === quote.id;
              return (
                <div
                  key={quote.id}
                  className="p-4 rounded-2xl bg-white border border-[#E8E2D5] shadow-xs space-y-2 hover:border-[#1B4332]/30 transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] text-[#52796F]">
                    <span className="font-semibold text-[#1B4332]">{quote.categoryLabel}</span>
                    <span className="font-mono text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded">{quote.tag}</span>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-[#1B4332] leading-snug break-keep">
                    "{quote.dialect}"
                  </p>

                  <p className="text-xs text-stone-600 leading-relaxed bg-[#F8F5EE] p-2 rounded-xl">
                    💡 {quote.meaning}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <button
                      type="button"
                      onClick={() => handleSpeak(quote)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-colors ${
                        isItemPlaying
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-[#1B4332] text-white hover:bg-[#2D6A4F]'
                      }`}
                    >
                      {isItemPlaying ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>정지</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                          <span>듣기</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1 text-stone-500">
                      <button
                        type="button"
                        onClick={() => handleCopy(quote)}
                        className="p-1.5 hover:text-stone-800 hover:bg-[#F2ECE1] rounded-lg transition-colors"
                        title="복사"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onRemoveFavorite(quote.id);
                          onShowToast('보관함에서 삭제했습니더.', 'info');
                        }}
                        className="p-1.5 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
