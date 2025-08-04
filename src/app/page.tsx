'use client';

import { useEffect } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import useBioStore from '@/stores/useBioStore';
import ArtistBio from '@/components/Artist/ArtistBio';
import { BioFields } from '@/lib/contentful';

const Home: React.FC = () => {
  const { bio, loading, error, loadBio } = useBioStore();

  useEffect(() => {
    if (!bio && !loading) {
      loadBio();
    }
  }, [bio, loading, loadBio]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8, mt: 10 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading artist bio...
        </Typography>
      </Container>
    );
  }

  if (error || !bio) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8, mt: 10 }}>
        <Typography variant="h5" color="error">
          {error || 'Artist bio not found. Please try again later.'}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <ArtistBio bio={bio as BioFields} />
    </Container>
  );
};

export default Home;
