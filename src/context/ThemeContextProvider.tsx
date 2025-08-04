'use client';

import { createContext, useContext, ReactNode, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from '@/styles/theme';

type ThemeMode = 'light' | 'dark';

type ThemeContextType = {
  mode: ThemeMode;
  toggleColorMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleColorMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  // Initial load from localStorage
  useEffect(() => {
    const storedMode = localStorage.getItem('themeMode') as ThemeMode | null;
    if (storedMode) {
      setMode(storedMode);
    } else {
      setMode('dark');
    }
    setMounted(true);
  }, []);

  // Update localStoage and <html> class when mode changes
  useEffect(() => {
    if (!mounted) return; // Won't run on server or before mount
    localStorage.setItem('themeMode', mode);
    const root = window.document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${mode}`);
  }, [mode, mounted]);

  const toggleColorMode = () => {
    setMode((prev) => {
      const nextMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', nextMode);
      return nextMode;
    });
  };

  // Memoize theme object and context value
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);
  const contextValue = useMemo(() => ({ mode, toggleColorMode }), [mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {mounted ? children : null}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
