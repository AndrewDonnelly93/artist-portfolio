'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '@/app/api/firebase/firebaseConfig';

export default function CreateAdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Admin'); // default value
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // 1️⃣ Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Save additional user data (userType) to Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        email,
        userType,
        createdAt: new Date(),
      });

      setSuccess(`Admin account created! Type: ${userType}`);
      setEmail('');
      setPassword('');
      setUserType('Admin');

      setTimeout(() => router.push('/admin/orders'), 2000);
    } catch (err: any) {
      console.error('Error creating admin:', err);
      setError(err.message || 'Failed to create admin');
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
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Create Admin Account
        </Typography>
        <form onSubmit={handleCreate} noValidate>
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
            autoComplete="new-password"
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="userType-label">User Type</InputLabel>
            <Select
              labelId="userType-label"
              value={userType}
              label="User Type"
              onChange={(e) => setUserType(e.target.value)}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="SuperAdmin">SuperAdmin</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" variant="body2" sx={{ mt: 1 }}>
              {success}
            </Typography>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Create Admin
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
