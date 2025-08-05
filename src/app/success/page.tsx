'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

type SessionData = {
  id: string;
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
    purchaseType: 'original' | 'print';
    paintingId: string;
    paintingTitle: string;
  };
  line_items?: any;
};

const SuccessPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionData | null>(null);
  const [comment, setComment] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const queryParams = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );
  const sessionId = queryParams.get('session_id');

  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/checkout-session?sessionId=${sessionId}`);
        const data = await res.json();
        setSession(data);

        // Prefill address from Stripe
        if (data?.customer_details?.address) {
          setDeliveryInfo({
            addressLine1: data.customer_details.address.line1 || '',
            addressLine2: data.customer_details.address.line2 || '',
            city: data.customer_details.address.city || '',
            postalCode: data.customer_details.address.postal_code || '',
            country: data.customer_details.address.country || '',
            phone: data.customer_details.phone || '',
          });
        }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session?.id,
          paintingId: session?.metadata.paintingId,
          purchaseType: session?.metadata?.purchaseType,
          paintingTitle: session?.metadata?.paintingTitle,
          email: session?.customer_details.email,
          name: session?.customer_details.name,
          deliveryInfo,
          comment,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        router.push('/thank-you');
        setComment('');
      } else {
        alert(result.error || 'Failed to submit order info.');
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('An unexpected error occurred.');
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!session) {
    return <Typography>Session not found or expired.</Typography>;
  }

  const amount = (session.amount_total / 100).toFixed(2);
  const status = session.payment_status;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Thank you for your purchase!
      </Typography>

      <Typography variant="h5" gutterBottom>
        Order Summary
      </Typography>
      <Typography>
        <strong>Painting:</strong> {session.metadata.paintingTitle}
      </Typography>
      <Typography>
        <strong>Purchase Type:</strong>{' '}
        {session.metadata.purchaseType === 'original' ? 'Original Painting' : 'Print'}
      </Typography>
      <Typography>
        <strong>Payment Status:</strong> {status}
      </Typography>
      <Typography>
        <strong>Total Paid:</strong> €{amount}
      </Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 4 }}>
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
        <TextField
          label="Comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" type="submit" disabled={submitted}>
            Submit Order Info
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SuccessPage;
