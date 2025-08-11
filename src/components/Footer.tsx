'use client';

import React from 'react';
import { Container, Typography, Stack, Box, Link, useTheme, SxProps, Theme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';
import { useThemeContext } from '@/context/ThemeContextProvider';

type SocialLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
  aria: string;
};

const socialLinks: SocialLink[] = [
  {
    href: 'https://facebook.com/davidmcewenpainter/',
    label: 'Facebook',
    icon: <FacebookIcon />,
    aria: 'Facebook',
  },
  {
    href: 'https://www.singulart.com/en/artist/david-mcewen-17461',
    label: 'Singulart Gallery',
    icon: <LanguageIcon />,
    aria: 'Singulart Gallery',
  },
  {
    href: 'https://fineartamerica.com/profiles/david-mcewen',
    label: 'Fine Art America',
    icon: <LanguageIcon />,
    aria: 'Fine Art America',
  },
];

const Footer: React.FC = () => {
  const theme = useTheme();
  const year = new Date().getFullYear();

  // Theme-aware colors
  const backgroundColor = theme.palette.background.footer;
  const textColor = theme.palette.getContrastText(backgroundColor);
  const linkHoverColor = theme.palette.primary.light;
  const borderColor = theme.palette.divider;
  const linkHoverBg = theme.palette.action.hover;

  const linkHoverStyles: SxProps<Theme> = {
    color: linkHoverColor,
    textDecoration: 'underline',
    transition: 'color 0.3s ease, text-decoration 0.3s ease',
    '@media (hover: none)': {
      backgroundColor: linkHoverBg,
      textDecoration: 'underline',
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: backgroundColor,
        color: textColor,
        py: 4,
        mt: 8,
        borderTop: `1px solid ${borderColor}`,
      }}
    >
      <Typography variant="body2" align="center" sx={{ mb: 2, color: 'inherit' }}>
        © {year} David McEwen International. All rights reserved.
      </Typography>

      <Container maxWidth="md" sx={{ mb: 2 }}>
        <Typography variant="body2" align="center" sx={{ mt: 2, mb: 2, color: 'inherit' }}>
          Follow David McEwen on:
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2, sm: 4 }}
          sx={{ mb: 2, justifyContent: 'center', alignItems: 'center' }}
        >
          {socialLinks.map(({ href, label, icon, aria }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="hover"
              aria-label={aria}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontWeight: 500,
                cursor: 'pointer',
                py: 1,
                px: 2,
                borderRadius: 1,
                width: { xs: '100%', sm: 'auto' },
                justifyContent: 'center',
                '&:hover, &:focus-visible': linkHoverStyles,
              }}
            >
              {icon}
              {label}
            </Link>
          ))}
        </Stack>

        <Typography variant="body2" align="center" sx={{ color: 'inherit' }}>
          Built by&nbsp;
          <Link
            href="https://www.donnellytechsolutions.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            underline="hover"
            aria-label="Andrew Donnelly"
            sx={{
              fontWeight: 600,
              cursor: 'pointer',
              '&:hover, &:focus-visible': linkHoverStyles,
            }}
          >
            Donnelly Tech Solutions
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
