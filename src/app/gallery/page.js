import { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import GalleryClient from './GalleryClient';

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <GalleryClient />
    </Suspense>
  );
}
