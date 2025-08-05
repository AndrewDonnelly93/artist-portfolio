'use client';

import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

const ThankYouPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        🎉 Thank you!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Your order details and delivery information have been received.
        <br />
        We'll be in touch shortly.
      </Typography>

      <Link href="/gallery" passHref>
        <Button variant="outlined">Back to Gallery</Button>
      </Link>
    </Box>
  );
};

export default ThankYouPage;
