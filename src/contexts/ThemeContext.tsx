/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export const THEMES = ['fluid', 'blueprint', 'ascii', 'lidar', 'minimal', 'highway'] as const;
export type Theme = (typeof THEMES)[number];

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const ASCII_FONTS = [
  'https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap',
  'https://fonts.googleapis.com/css2?family=VT323&display=swap',
];

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    if (saved && THEMES.includes(saved as Theme)) {
      return saved as Theme;
    }
    return THEMES[0];
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const links: HTMLLinkElement[] = [];

    if (theme === 'ascii') {
      ASCII_FONTS.forEach((href) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
        links.push(link);
      });
    }

    return () => {
      links.forEach((link) => link.remove());
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => THEMES[(THEMES.indexOf(prev) + 1) % THEMES.length]);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div className={`theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
