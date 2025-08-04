import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#121212',
      footer: '#1c1c1c'
    },
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
    text: { primary: '#ffffff', secondary: '#cccccc' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fafafa',
      paper: '#fff',
      footer: '#f0f0f0'
    },
    primary: { main: '#1976d2' }, // blueish for light mode
    secondary: { main: '#d81b60' },
    text: { primary: '#000', secondary: '#555' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default { darkTheme, lightTheme };
