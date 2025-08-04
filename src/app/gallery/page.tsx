import { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import GalleryClient from './GalleryClient';

const GalleryPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <Box
          sx={ { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' } }
        >
          <CircularProgress />
        </Box>
      }
    >
      <GalleryClient />
    </Suspense>
  );
}

export default GalleryPage