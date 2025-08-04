'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Button,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '@/context/ThemeContextProvider';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const { mode, toggleColorMode } = useThemeContext();
  const isDark = mode === 'dark';

  const pathname = usePathname();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{
        bgcolor: isDark ? 'background.paper' : 'primary.main',
        color: isDark ? 'text.primary' : 'common.white',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          component={Link}
          href="/"
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            cursor: 'pointer',
            color: isDark ? 'text.primary' : 'common.white',
            userSelect: 'none',
            textDecoration: 'none',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          David McEwen International
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;

            return (
              <Button
                key={label}
                component={Link}
                href={href}
                color="inherit"
                sx={{
                  fontWeight: 600,
                  borderRadius: 1,
                  textTransform: 'none',
                  position: 'relative',
                  border: isActive
                    ? `2px solid ${isDark ? theme.palette.primary.light : theme.palette.common.white}`
                    : '2px solid transparent',
                  boxShadow: isActive ? `0 0 8px ${theme.palette.primary.main}bb` : 'none',
                  '&:hover': {
                    bgcolor: isDark ? 'primary.dark' : 'primary.light',
                    color: isDark ? 'common.white' : 'primary.main',
                    boxShadow: `0 2px 6px ${theme.palette.primary.main}66`,
                    border: `2px solid ${theme.palette.primary.main}`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {label}
              </Button>
            );
          })}
        </Box>

        {/* Theme toggle button and hamburger menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, gap: 1 }}>
          <IconButton
            sx={{ color: isDark ? 'text.primary' : 'common.white' }}
            onClick={toggleColorMode}
            aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            bgcolor: isDark ? 'background.default' : 'background.paper',
            color: isDark ? 'text.primary' : 'text.primary',
            width: 220,
          },
        }}
      >
        <List>
          {navLinks.map(({ label, href }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton
                component={Link}
                href={href}
                onClick={toggleDrawer(false)}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                  '&:hover': {
                    bgcolor: isDark ? 'primary.dark' : 'primary.light',
                    color: isDark ? 'common.white' : 'primary.main',
                    boxShadow: `0 2px 6px ${theme.palette.primary.main}66`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
