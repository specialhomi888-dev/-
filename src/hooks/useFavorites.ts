import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'jungshin_charira_favs_v1';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load favorites from localStorage', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  }, [favoriteIds]);

  const isFavorite = useCallback((id: string) => {
    return favoriteIds.includes(id);
  }, [favoriteIds]);

  const toggleFavorite = useCallback((id: string) => {
    let nextState = false;
    setFavoriteIds((prev) => {
      if (prev.includes(id)) {
        nextState = false;
        return prev.filter((item) => item !== id);
      } else {
        nextState = true;
        return [id, ...prev];
      }
    });
    return nextState;
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const clearAllFavorites = useCallback(() => {
    setFavoriteIds([]);
  }, []);

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearAllFavorites,
  };
}
