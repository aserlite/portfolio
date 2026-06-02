import { createContext, useContext, useState, type ReactNode } from 'react';

export type Theme = 'fluid' | 'minimal' | 'blueprint' | 'ascii' | 'lidar';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('fluid');

  const toggleTheme = () => {
    const themes: Theme[] = ['fluid', 'minimal', 'blueprint', 'ascii', 'lidar'];
    setTheme((prev) => themes[(themes.indexOf(prev) + 1) % themes.length]);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div className={`theme-${theme}`}>
        {children}
      </div>
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
