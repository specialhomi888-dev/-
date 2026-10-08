import React from 'react';

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'error';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-[90%] max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => onDismiss(toast.id)}
          className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#1B4332] text-[#FDFBF7] shadow-xl text-sm font-medium border border-[#2D6A4F] animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center gap-2">
            <span>{toast.type === 'error' ? '⚠️' : '⚡'}</span>
            <span>{toast.text}</span>
          </div>
          <button
            type="button"
            className="text-[#D8F3DC] hover:text-white text-xs px-1"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
