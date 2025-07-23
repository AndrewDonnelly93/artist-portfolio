'use client';

import React from 'react';
import { Avatar, Typography, Box, Stack, IconButton, Divider, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

interface Photo {
  fields: {
    file: {
      url: string;
    };
  };
}

interface ArtistBioProps {
  bio: {
    name: string;
    description: any; // rich text object from Contentful (you can type more specifically if you want)
    photo: Photo;
    facebookUrl?: string;
    singulartUrl?: string;
    fineArtAmericaUrl?: string;
  } | null;
}

const ArtistBio: React.FC<ArtistBioProps> = ({ bio }) => {
  const theme = useTheme();

  if (!bio) return null;

  const { name, description, photo, facebookUrl, singulartUrl, fineArtAmericaUrl } = bio;
  const htmlDescription = documentToHtmlString(description);

  return (
    <Stack
      spacing={4}
      alignItems="center"
      sx={{
        py: 8,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#fff',
        color: theme.palette.text.primary,
      }}
    >
      <Avatar
        src={`https:${photo.fields.file.url}`}
        alt={name}
        sx={{ width: 160, height: 160, mb: 2 }}
      />

      <Typography variant="h3" component="h1" align="center" gutterBottom>
        {name}
      </Typography>

      <Box sx={{ maxWidth: 600, textAlign: 'center', px: 2 }}>
        <Typography
          component="div"
          dangerouslySetInnerHTML={{ __html: htmlDescription }}
          sx={{
            whiteSpace: 'pre-line',
            lineHeight: 1.6,
            mb: 3,
            textAlign: 'left',
            color: theme.palette.text.primary,
          }}
        />
      </Box>

      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
        Follow {name} on social media:
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center">
        {facebookUrl && (
          <IconButton
            component="a"
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </IconButton>
        )}

        {singulartUrl && (
          <IconButton
            component="a"
            href={singulartUrl}
            target="_blank"
            rel="noopener noreferrer"
            color="secondary"
            aria-label="Singulart"
          >
            <LanguageIcon />
          </IconButton>
        )}

        {fineArtAmericaUrl && (
          <IconButton
            component="a"
            href={fineArtAmericaUrl}
            target="_blank"
            rel="noopener noreferrer"
            color="secondary"
            aria-label="Fine Art America"
          >
            <LanguageIcon />
          </IconButton>
        )}
      </Stack>

      <Divider sx={{ width: '100%', mt: 4 }} />
    </Stack>
  );
};

export default ArtistBio;
