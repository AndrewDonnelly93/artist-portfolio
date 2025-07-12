'use client';

import { useState, useEffect } from 'react';
import {Container, Typography, CircularProgress} from '@mui/material';
import { fetchBio } from '../lib/contentful';
import ArtistBio from '../components/Artist/ArtistBio';

const Home = () => {
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBio = async () => {
      try {
        const fetchedBio = await fetchBio();
        setBio(fetchedBio);
      } catch (error) {
        console.error("Error fetching bio:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBio();
  }, []);

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

  if (!bio) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8, mt: 10 }}>
        <Typography variant="h5" color="error">
          Artist bio not found. Please try again later.
        </Typography>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md">
      <ArtistBio bio={bio} />
    </Container> 
  );
};

export default Home;