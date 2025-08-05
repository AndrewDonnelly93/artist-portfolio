'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from '@mui/material';

type Payment = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  customer_email: string | null;
  created: number;
  metadata: any;
};

const OrdersPage = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/orders')
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Amount (€)</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Painting ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.customer_email ?? '—'}</TableCell>
              <TableCell>{(p.amount / 100).toFixed(2)}</TableCell>
              <TableCell>{p.status}</TableCell>
              <TableCell>{new Date(p.created * 1000).toLocaleString()}</TableCell>
              <TableCell>{p.metadata?.paintingId ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default OrdersPage;
