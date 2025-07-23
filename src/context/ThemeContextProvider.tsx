'use client';

import { createContext, useContext, ReactNode, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from '@/styles/theme';

type ThemeMode = 'light' | 'dark';

type ThemeContextType = {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleColorMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

type Props = {
  children: ReactNode;
};

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  const toggleColorMode = () => {
    setMode((prev) => {
      const nextMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', nextMode);
      return nextMode;
    });
  };

  useEffect(() => {
    const storedMode = localStorage.getItem('themeMode') as ThemeMode | null;
    if (storedMode) {
      setMode(storedMode);
    } else {
      setMode('dark');
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // Fon't run on server or before mount
    const root = window.document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${mode}`);
  }, [mode, mounted]);

  // Update the <html> class on mode change
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${mode}`);
  }, [mode]);

  // Memoize theme object and context value
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);
  const contextValue = useMemo(() => ({ mode, toggleColorMode }), [mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
