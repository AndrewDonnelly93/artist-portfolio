'use client';

import { Button, Box } from '@mui/material';

type BuyButtonProps = {
  price?: number;
  printPrice?: number;
  title: string;
  id: string;
  printAvailable?: boolean;
  availableForSale?: boolean;
};

const BuyButtons: React.FC<BuyButtonProps> = ({
  price,
  printPrice,
  title,
  id,
  printAvailable,
  availableForSale,
}) => {
  const handleBuyNow = async (purchaseType: 'original' | 'print') => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        price: purchaseType === 'original' ? price : printPrice,
        id,
        purchaseType,
      }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      {price && availableForSale && (
        <Button
          variant="outlined"
          color="primary"
          sx={{ mr: 2, mb: 2 }}
          onClick={() => handleBuyNow('original')}
        >
          Buy Original (€{price})
        </Button>
      )}
      {printPrice && printAvailable && (
        <Button
          sx={{ mb: 2 }}
          variant="outlined"
          color="secondary"
          onClick={() => handleBuyNow('print')}
        >
          Buy Print (€{printPrice})
        </Button>
      )}
    </Box>
  );
};

export default BuyButtons;
