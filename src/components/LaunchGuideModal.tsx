import React from 'react';
import { Rocket, X, CheckCircle2, Globe, ShieldCheck, Smartphone, ExternalLink } from 'lucide-react';

interface LaunchGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LaunchGuideModal: React.FC<LaunchGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#FBF9F4] rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col shadow-2xl border border-[#E8E2D5] overflow-hidden">
        <div className="w-12 h-1.5 bg-[#D6CEBE] rounded-full mx-auto my-2.5 sm:hidden" />

        <div className="px-5 py-3 border-b border-[#E8E2D5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-[#1B4332]" />
            <h2 className="text-base font-bold text-[#1B4332]">
              1인 창업자 무료 배포 가이드 🚀
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

        <div className="p-5 overflow-y-auto space-y-4 text-xs text-stone-700 flex-1 leading-relaxed">
          {/* Key Advantage Banner */}
          <div className="p-3.5 rounded-2xl bg-[#E9F5ED] border border-[#C7E9D4] text-[#1B4332] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
              <span>서버 유지비 0원 / 무제한 무료 배포 구조</span>
            </div>
            <p className="text-[11px] text-[#2D6A4F]">
              이 앱은 유료 외부 API, 별도 DB, 백엔드 서버 없이 브라우저 로컬 저장소와 PWA 기술로만 작동하므로 평생 <strong>서버 유지비가 0원</strong>입니다.
            </p>
          </div>

          {/* Step 1: Vercel 배포 */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#E8E2D5] space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold text-[10px]">
                1
              </span>
              <h3 className="font-bold text-[#1B4332] text-sm">
                가장 추천: Vercel에 1분 배포 (무료)
              </h3>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-stone-600 pl-1">
              <li>
                이 코드를 <strong>GitHub 저장소</strong>(Repository)에 업로드(Push)합니다.
              </li>
              <li>
                <strong>Vercel.com</strong>에 무료 가입 후 <span className="font-medium text-stone-800">"Add New Project"</span>를 클릭합니다.
              </li>
              <li>
                GitHub 계정을 연결하고 방금 올린 저장소를 선택한 뒤 <span className="font-medium text-stone-800">"Deploy"</span> 버튼을 누르면 끝!
              </li>
              <li>
                10초 만에 <code className="bg-stone-100 px-1 py-0.5 rounded text-[#1B4332]">https://내앱이름.vercel.app</code> 무료 주소가 자동 생성됩니다.
              </li>
            </ol>
          </div>

          {/* Step 2: 스마트폰 앱 설치(PWA) 확인 */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#E8E2D5] space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold text-[10px]">
                2
              </span>
              <h3 className="font-bold text-[#1B4332] text-sm">
                스마트폰 홈 화면 앱 설치 (PWA)
              </h3>
            </div>
            <p className="text-[11px] text-stone-600">
              이미 <strong>Manifest, 서비스 워커, 192/512px 앱 아이콘</strong>이 모두 탑재되어 있습니다. 배포된 주소에 접속하면:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-stone-600 pl-1">
              <li><strong>안드로이드/크롬:</strong> 화면 상단의 [앱 설치] 버튼 또는 브라우저 메뉴의 '앱 설치' 클릭</li>
              <li><strong>아이폰(Safari):</strong> 하단 공유 버튼 누르고 '홈 화면에 추가' 클릭</li>
            </ul>
          </div>

          {/* Step 3: SNS 및 커뮤니티 바이럴 팁 */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#E8E2D5] space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold text-[10px]">
                3
              </span>
              <h3 className="font-bold text-[#1B4332] text-sm">
                1일차 사용자 유치 팁
              </h3>
            </div>
            <p className="text-[11px] text-stone-600">
              각 문구마다 <span className="font-medium text-stone-800">[공유] 및 [복사]</span> 기능이 내장되어 있습니다. 오픈채팅방, 스터디 그룹, 인스타그램 스토리, 틱톡에 '1초 멘탈 충전소'로 링크를 공유해보세요!
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#1B4332] text-white font-bold text-xs hover:bg-[#2D6A4F] transition-colors shadow-sm"
          >
            가이드 확인 완료!
          </button>
        </div>
      </div>
    </div>
  );
};
