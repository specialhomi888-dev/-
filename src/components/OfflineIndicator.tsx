import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <aside aria-label="오프라인 상태 알림" className="fixed bottom-4 left-4 right-4 max-w-sm mx-auto z-40 flex items-center justify-center gap-2 rounded-xl bg-stone-800 text-stone-100 py-2 px-3 text-xs shadow-lg border border-stone-700 animate-in fade-in slide-in-from-bottom-2">
      <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
      <span>오프라인 상태입니다. 저장된 데이터로 정상 작동합니다.</span>
    </aside>
  );
};
