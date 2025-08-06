'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
// Adjust path to your firebase config
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/api/firebase/firebaseConfig';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(''); // Firebase uses email for login
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem('adminLoggedIn', 'true');
      router.push('/admin/orders');
    } catch (err: any) {
      console.error('Firebase login error:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        px: 2,
      }}
    >
      <Paper sx={{ p: 4, width: 320 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Log In
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
