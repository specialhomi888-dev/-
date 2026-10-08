import React from 'react';
import { Bookmark, Sparkles, BookOpen, Rocket, Download } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
  favoriteCount: number;
  onOpenFavorites: () => void;
  onOpenDictionary: () => void;
  onOpenLaunchGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  favoriteCount,
  onOpenFavorites,
  onOpenDictionary,
  onOpenLaunchGuide,
}) => {
  const { isInstallable, isIOS, isInstalled, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = React.useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-[#FBF9F4]/90 backdrop-blur-md border-b border-[#E8E2D5] px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#1B4332] flex items-center justify-center text-amber-300 font-bold text-lg shadow-sm">
              ⚡
            </span>
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tight text-[#1B4332] font-display leading-none">
                정신차리라!
              </h1>
              <span className="text-[10px] text-[#52796F] font-medium tracking-tighter">
                1초 멘탈 충전소
              </span>
            </div>
          </div>

          {/* Zone 2 & 3: Actions */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* PWA Install Trigger if not installed */}
            {!isInstalled && (isInstallable || isIOS) && (
              <button
                type="button"
                onClick={() => {
                  if (isInstallable) {
                    install();
                  } else if (isIOS) {
                    setShowIOSModal(true);
                  }
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#1B4332] text-white text-xs font-semibold hover:bg-[#2D6A4F] transition-colors active:scale-95 shadow-sm"
                title="앱으로 설치하기"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">앱 설치</span>
              </button>
            )}

            {/* 사투리 사전 버튼 */}
            <button
              type="button"
              onClick={onOpenDictionary}
              className="p-2 rounded-lg text-[#2D6A4F] hover:bg-[#EFE9DC] transition-colors active:scale-95"
              title="사투리 사전"
              aria-label="사투리 사전"
            >
              <BookOpen className="w-5 h-5" />
            </button>

            {/* 출시 가이드 (1인 창업자용) */}
            <button
              type="button"
              onClick={onOpenLaunchGuide}
              className="p-2 rounded-lg text-[#2D6A4F] hover:bg-[#EFE9DC] transition-colors active:scale-95"
              title="초보자 출시 가이드"
              aria-label="초보자 출시 가이드"
            >
              <Rocket className="w-5 h-5" />
            </button>

            {/* 즐겨찾기 보관함 버튼 */}
            <button
              type="button"
              onClick={onOpenFavorites}
              className="relative p-2 rounded-lg text-[#1B4332] hover:bg-[#EFE9DC] transition-colors active:scale-95"
              title="즐겨찾기 목록"
              aria-label="즐겨찾기 목록"
            >
              <Bookmark className="w-5 h-5" />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {favoriteCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* iOS Safari 설치 안내 모달 */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-[#FBF9F4] p-5 shadow-2xl border border-[#E8E2D5] text-slate-800 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
              <div className="flex items-center gap-2">
                <span className="text-xl">📱</span>
                <h3 className="text-base font-bold text-[#1B4332]">아이폰 홈 화면에 추가하기</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm p-1"
              >
                ✕
              </button>
            </div>
            
            <div className="py-4 space-y-3 text-xs leading-relaxed text-slate-700">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                <p>Safari 브라우저 하단의 <strong>공유 버튼(네모에 위쪽 화살표)</strong>을 누르세요.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                <p>메뉴를 아래로 내려 <strong>'홈 화면에 추가'</strong>를 선택하세요.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                <p>우측 상단의 <strong>'추가'</strong>를 누르면 진짜 스마트폰 앱처럼 바로 실행됩니다!</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#1B4332] text-white font-medium text-xs hover:bg-[#2D6A4F] transition-colors"
            >
              확인했습니더!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
