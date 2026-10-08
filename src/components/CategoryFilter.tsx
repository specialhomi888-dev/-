import React from 'react';
import { QUOTE_CATEGORIES, SPICE_LEVELS } from '../data/quotes';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedSpice: number;
  onSelectSpice: (spice: number) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedSpice,
  onSelectSpice,
}) => {
  return (
    <div className="w-full space-y-2.5">
      {/* 1. 카테고리 탭 (수평 스크롤 지원) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar -mx-1 px-1">
        {QUOTE_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all active:scale-95 ${
                isActive
                  ? 'bg-[#1B4332] text-white shadow-sm'
                  : 'bg-[#F2ECE1] text-[#3A5A40] hover:bg-[#E8E0D2]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 2. 매운맛 강도 조절 (Segmented Control) */}
      <div className="flex items-center justify-between p-1 bg-[#F2ECE1] rounded-xl text-xs">
        {SPICE_LEVELS.map((sp) => {
          const isActive = selectedSpice === sp.level;
          return (
            <button
              key={sp.level}
              type="button"
              onClick={() => onSelectSpice(sp.level)}
              className={`flex-1 py-1 px-1.5 rounded-lg text-center font-medium transition-all text-[11px] truncate ${
                isActive
                  ? 'bg-white text-[#1B4332] font-bold shadow-xs'
                  : 'text-[#588157] hover:text-[#1B4332]'
              }`}
            >
              <span className="mr-0.5">{sp.icon}</span>
              <span>{sp.level === 0 ? '모든맛' : sp.level === 1 ? '순한맛' : sp.level === 2 ? '보통맛' : '매운맛'}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
