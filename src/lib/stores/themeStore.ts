import { create } from 'zustand';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  initialize: () => void;
}

const THEME_KEY = 'solve_theme';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

function applyTheme(resolved: 'light' | 'dark') {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolved);
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'system',
  resolvedTheme: 'light',

  setTheme: (theme) => {
    const resolved = theme === 'system' ? getSystemTheme() : theme;
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(resolved);
    set({ theme, resolvedTheme: resolved });
  },

  initialize: () => {
    const stored = (localStorage.getItem(THEME_KEY) as Theme) || 'system';
    const resolved = stored === 'system' ? getSystemTheme() : stored;
    applyTheme(resolved);
    set({ theme: stored, resolvedTheme: resolved });
  },
}));
