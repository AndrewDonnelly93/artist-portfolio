'use client';

import { Button, Box } from '@mui/material';

type BuyButtonProps = {
  price?: number;
  printPrice?: number;
  title: string;
  id: string;
};

const BuyButtons: React.FC<BuyButtonProps> = ({ price, printPrice, title, id }) => {
  const handleBuyNow = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        price,
        id,
      }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  const handlePrintPurchase = () => {
    // Implement print purchase functionality
    console.log(`Purchasing print of ${title} with ID: ${id}`);
  };

  return (
    <Box sx={{ mt: 2 }} onClick={handleBuyNow}>
      {price && (
        <Button variant="contained" color="primary" sx={{ mr: 2, mb: 2 }}>
          Buy Original (€{price})
        </Button>
      )}
      {printPrice && (
        <Button sx={{ mb: 2 }} variant="outlined" color="secondary">
          Buy Print (€{printPrice})
        </Button>
      )}
    </Box>
  );
};

export default BuyButtons;
