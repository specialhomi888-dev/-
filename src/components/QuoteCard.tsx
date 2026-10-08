import React, { useState } from 'react';
import { Volume2, VolumeX, Heart, Share2, Copy, Sparkles, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Quote } from '../data/quotes';
import { speakDialect, stopSpeaking, isTTSSupported } from '../utils/tts';

interface QuoteCardProps {
  quote: Quote;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  isFavorite,
  onToggleFavorite,
  onShowToast,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [isCopied, setIsCopied] = useState(false);
  const [showAccentTip, setShowAccentTip] = useState(false);

  const handleSpeak = () => {
    if (!isTTSSupported()) {
      onShowToast('이 브라우저는 음성 합성(TTS)을 지원하지 않습니다.', 'error');
      return;
    }

    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }

    const ok = speakDialect(quote.dialect, {
      rate: speechRate,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: (msg) => {
        setIsPlaying(false);
        onShowToast(msg, 'error');
      },
    });

    if (!ok) {
      setIsPlaying(false);
    }
  };

  const handleCopy = async () => {
    const textToCopy = `⚡ [정신차리라!]\n"${quote.dialect}"\n\n📌 표준어: ${quote.standard}\n💡 뜻: ${quote.meaning}\n\n👉 매일 멘탈 충전: ${window.location.origin}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      onShowToast('문구가 복사되었습니더! 친구한테 보내뿌소~', 'success');
    } catch {
      onShowToast('복사에 실패했습니다.', 'error');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: '정신차리라! - 경상도 사투리 동기부여',
      text: `⚡ "${quote.dialect}"\n${quote.meaning}`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  const getSpiceBadge = (level: number) => {
    switch (level) {
      case 1:
        return '🌱 순한맛 (츤데레)';
      case 2:
        return '🌶️ 보통맛 (찰진 팩폭)';
      case 3:
        return '🔥 매운맛 (극딜 정신번쩍)';
      default:
        return '보통맛';
    }
  };

  return (
    <article className="w-full bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-[#E8E2D5] flex flex-col justify-between transition-all relative overflow-hidden">
      {/* Top subtle decorative pattern */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#52796F]" />

      {/* 1. Header Metadata (Unboxed text with separators, anti-slop) */}
      <div className="flex items-center justify-between text-xs text-[#52796F] mb-4">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="text-[#1B4332] font-semibold">{quote.categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{getSpiceBadge(quote.spiceLevel)}</span>
        </div>
        <span className="text-[11px] font-mono text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
          {quote.tag}
        </span>
      </div>

      {/* 2. Core Dialect Punchline */}
      <div className="my-2 sm:my-3">
        <p className="text-xl sm:text-2xl font-black text-[#1B4332] tracking-tight leading-snug sm:leading-relaxed break-keep font-display">
          "{quote.dialect}"
        </p>
      </div>

      {/* 3. Standard Korean translation & Meaning */}
      <div className="mt-3 p-3.5 rounded-2xl bg-[#F8F5EE] border border-[#EAE3D6] space-y-1.5 text-xs text-stone-700">
        <div className="flex items-start gap-1.5">
          <span className="text-[#2D6A4F] font-bold shrink-0">표준어:</span>
          <p className="leading-relaxed text-stone-800">{quote.standard}</p>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="text-[#1B4332] font-bold shrink-0">속뜻:</span>
          <p className="leading-relaxed font-medium text-stone-900">{quote.meaning}</p>
        </div>
      </div>

      {/* 4. 사투리 억양 꿀팁 토글 (Accents & pronunciation tip) */}
      <div className="mt-2.5">
        <button
          type="button"
          onClick={() => setShowAccentTip(!showAccentTip)}
          className="flex items-center justify-between w-full py-1.5 px-2 text-[11px] text-[#2D6A4F] font-medium hover:text-[#1B4332] transition-colors"
        >
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>경상도 원어민 억양 발음 꿀팁</span>
          </span>
          {showAccentTip ? (
            <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
          )}
        </button>

        {showAccentTip && (
          <div className="px-3 py-2 mt-1 rounded-xl bg-amber-50/80 border border-amber-200/60 text-[11px] leading-relaxed text-amber-900 animate-in fade-in duration-150">
            {quote.accentTip}
          </div>
        )}
      </div>

      {/* 5. Action Toolbar (Min touch target 44px) */}
      <div className="mt-5 pt-3.5 border-t border-[#EAE3D6] flex items-center justify-between">
        {/* Left: TTS Voice Speaker Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSpeak}
            className={`min-h-[44px] px-3.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold transition-all active:scale-95 ${
              isPlaying
                ? 'bg-rose-600 text-white shadow-sm animate-pulse'
                : 'bg-[#1B4332] text-white hover:bg-[#2D6A4F] shadow-xs'
            }`}
            title="문구 음성으로 듣기"
            aria-label="문구 음성으로 듣기"
          >
            {isPlaying ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>정지</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-300" />
                <span>사투리로 듣기</span>
              </>
            )}
          </button>

          {/* Voice Speed Selector */}
          <div className="flex items-center bg-[#F2ECE1] rounded-lg p-0.5 text-[10px] text-[#2D6A4F]">
            {[
              { rate: 0.9, label: '0.9x' },
              { rate: 1.0, label: '1.0x' },
              { rate: 1.2, label: '1.2x' },
            ].map((item) => (
              <button
                key={item.rate}
                type="button"
                onClick={() => setSpeechRate(item.rate)}
                className={`px-1.5 py-1 rounded transition-colors ${
                  speechRate === item.rate
                    ? 'bg-white text-[#1B4332] font-bold shadow-2xs'
                    : 'hover:text-[#1B4332]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Favorite, Share, Copy */}
        <div className="flex items-center gap-1">
          {/* Favorite Toggle */}
          <button
            type="button"
            onClick={() => onToggleFavorite(quote.id)}
            className={`min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center transition-transform active:scale-90 ${
              isFavorite
                ? 'text-rose-600 bg-rose-50 hover:bg-rose-100'
                : 'text-stone-400 hover:text-stone-700 hover:bg-[#F2ECE1]'
            }`}
            title={isFavorite ? '즐겨찾기에서 제거' : '즐겨찾기에 저장'}
            aria-label="즐겨찾기 토글"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-[#F2ECE1] transition-colors active:scale-90"
            title="문구 텍스트 복사"
            aria-label="문구 텍스트 복사"
          >
            {isCopied ? (
              <Check className="w-5 h-5 text-emerald-600" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-[#F2ECE1] transition-colors active:scale-90"
            title="카카오톡 및 공유하기"
            aria-label="문구 공유하기"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </article>
  );
};
