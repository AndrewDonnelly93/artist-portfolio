'use client';

import { Box, Typography } from '@mui/material';

const SuccessPage: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 8, mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Thank you for your purchase!
      </Typography>
      <Typography variant="body1">
        Your payment was successful. We'll be in touch with you shortly to confirm delivery details.
      </Typography>
    </Box>
  );
};

export default SuccessPage;
