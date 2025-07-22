'use client';
import { Container, Typography, Stack, Box, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ backgroundColor: '#000', color: '#fff', py: 4, mt: 8 }}>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mb: 2, color: '#fff' }}
      >
        © {year} David McEwen. All rights reserved.
      </Typography>

      <Container maxWidth="md" sx={{ mb: 2 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2, mb: 2, color: '#fff' }}
        >
          Follow David McEwen on:
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }} justifyContent="center">
          <Link
            href="https://facebook.com/davidmcewenpainter/"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            underline="always"
            aria-label="Facebook"
          >
            <FacebookIcon sx={{ mr: 1 }} />
            Facebook
          </Link>

          <Link
            href="https://www.singulart.com/en/artist/david-mcewen-17461"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="singulart"
            color="inherit"
            underline="always"
          >
            <LanguageIcon sx={{ mr: 1 }} />
            Singulart Gallery
          </Link>

          <Link
            href="https://fineartamerica.com/profiles/david-mcewen"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="fineArtAmerica"
            color="inherit"
            underline="always"
          >
            <LanguageIcon sx={{ mr: 1 }} />
            Fine Art America
          </Link>
        </Stack>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ color: '#fff' }}>
          Built by&nbsp;
          <Link
            href={'https://www.linkedin.com/in/andrewdonnelly93/'}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            underline="always"
            aria-label="Andrew Donnelly"
          >
            Andrew Donnelly
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
