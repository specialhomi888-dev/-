import React from 'react';
import { BookOpen, X, Volume2 } from 'lucide-react';
import { speakDialect } from '../utils/tts';

interface DialectDictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DICTIONARY_ITEMS = [
  {
    word: '천지삐까리',
    meaning: '엄청나게 흔하고 지천에 널려 있음을 이르는 말',
    example: '시간이 천지삐까리인 줄 아나? 금방 간데이!',
    pronounce: '천지삐까리',
  },
  {
    word: '똑디',
    meaning: '야무지고 확실하게, 똑바로',
    example: '눈에 힘 딱 주고 똑디 해라!',
    pronounce: '똑디 해라',
  },
  {
    word: '퍼뜩 / 인나라',
    meaning: '퍼뜩: 지체 없이 빨리, 인나라: 일어나라',
    example: '니 지금 누버서 뭐하노? 퍼뜩 인나라!',
    pronounce: '퍼뜩 인나라',
  },
  {
    word: '욕봤데이',
    meaning: '수고했다, 고생 많았다 (경상도식 최고의 따뜻한 격려)',
    example: '오늘 하루도 억수로 욕봤데이.',
    pronounce: '욕봤데이',
  },
  {
    word: '뽄때',
    meaning: '본때, 본보기 (실력을 화끈하게 증명해 보이는 것)',
    example: '니가 누군지 뽄때를 보여주고 온나!',
    pronounce: '뽄때를 보여줘라',
  },
  {
    word: '우얄래',
    meaning: '어쩌려고 그래? 어떻게 할 셈이니?',
    example: '이래 게을러가 우얄래?',
    pronounce: '우얄래',
  },
  {
    word: '아이가?',
    meaning: '~잖아? (동의를 구하며 팩트를 콕 찌르는 어미)',
    example: '내일부터 한다 카고 또 안 할 놈 아이가?',
    pronounce: '아이가',
  },
  {
    word: '개시해뿌라',
    meaning: '망설이지 말고 바로 첫 발을 내딛고 시작해버려라',
    example: '준비만 하지 말고 지금 바로 개시해뿌라!',
    pronounce: '개시해뿌라',
  },
];

export const DialectDictionaryModal: React.FC<DialectDictionaryModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#FBF9F4] rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col shadow-2xl border border-[#E8E2D5] overflow-hidden">
        <div className="w-12 h-1.5 bg-[#D6CEBE] rounded-full mx-auto my-2.5 sm:hidden" />

        <div className="px-5 py-3 border-b border-[#E8E2D5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#1B4332]" />
            <h2 className="text-base font-bold text-[#1B4332]">
              경상도 사투리 미니 사전 📖
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-[#EFE9DC]"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          <p className="text-xs text-stone-600 bg-emerald-50/80 p-3 rounded-xl border border-emerald-200/50 leading-relaxed">
            💡 경상도 사투리는 투박해 보여도 속정(情)이 깊고 에너지가 넘칩니다.
            스피커 아이콘을 누르면 발음을 직접 들어볼 수 있습니더!
          </p>

          <div className="grid gap-3">
            {DICTIONARY_ITEMS.map((item) => (
              <div
                key={item.word}
                className="p-3.5 rounded-2xl bg-white border border-[#E8E2D5] shadow-2xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-[#1B4332] font-display">
                    {item.word}
                  </span>
                  <button
                    type="button"
                    onClick={() => speakDialect(item.pronounce)}
                    className="flex items-center gap-1 text-[11px] text-[#2D6A4F] hover:text-[#1B4332] px-2 py-0.5 rounded-md hover:bg-[#F2ECE1] transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>발음</span>
                  </button>
                </div>
                <p className="text-xs text-stone-700 leading-normal">
                  {item.meaning}
                </p>
                <p className="text-[11px] text-stone-500 font-mono bg-[#F8F5EE] px-2 py-1 rounded-lg">
                  예문: "{item.example}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
