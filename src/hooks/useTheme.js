import { useEffect, useState } from 'react';

// Bump key so everyone gets the new default (dark) once
const THEME_KEY = 'pap_theme_v2';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    // Prefer saved theme; if none, default to dark for this app
    return localStorage.getItem(THEME_KEY) || 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}


