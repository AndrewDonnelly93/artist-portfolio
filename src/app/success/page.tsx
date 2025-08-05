'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';

type SessionData = {
  customer_details: {
    email: string;
    name: string;
    phone?: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      country?: string;
    };
  };
  amount_total: number;
  payment_status: string;
  metadata: {
    paintingId: string;
  };
  line_items?: any;
};

const SuccessPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionData | null>(null);
  const [deliveryInfo, setDeliveryInfo] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const queryParams = new URLSearchParams(window.location.search);
  const sessionId = queryParams.get('session_id');

  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/checkout-session?sessionId=${sessionId}`);
        const data = await res.json();
        setSession(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [sessionId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Delivery info submitted! (You can handle this to your backend)');
    // TODO: send deliveryInfo to your backend or email system
  };

  if (loading) return <CircularProgress />;

  if (!session) return <Typography>Session not found or expired.</Typography>;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Thank you for your purchase!
      </Typography>

      <Typography variant="h6" gutterBottom>
        Purchased Item(s):
      </Typography>
      <Typography>Name: {session.metadata.paintingId /* You can map to painting title here if you want */}</Typography>
      <Typography>Payment Status: {session.payment_status}</Typography>
      <Typography>Total Paid: €{(session.amount_total / 100).toFixed(2)}</Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Delivery Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Address Line 1"
          name="addressLine1"
          value={deliveryInfo.addressLine1}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Address Line 2"
          name="addressLine2"
          value={deliveryInfo.addressLine2}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="City"
          name="city"
          value={deliveryInfo.city}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Postal Code"
          name="postalCode"
          value={deliveryInfo.postalCode}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Country"
          name="country"
          value={deliveryInfo.country}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone"
          name="phone"
          value={deliveryInfo.phone}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type="submit">
          Submit Delivery Info
        </Button>
      </form>
    </Box>
  );
};

export default SuccessPage;
