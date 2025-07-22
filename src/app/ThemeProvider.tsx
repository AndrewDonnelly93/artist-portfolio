'use client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import theme from '@/styles/theme';

type Props = {
  children: ReactNode;
};

const AppThemeProvider = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
