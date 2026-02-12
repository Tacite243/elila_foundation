'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentTheme } from '@/redux/slices/themeSlice';

export function ThemeApplier() {
  const theme = useSelector(selectCurrentTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  // Ce composant ne rend rien, il agit seulement sur le DOM
  return null;
}