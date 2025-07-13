'use client';

import { useForm } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import dynamic from 'next/dynamic';
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Grid,
  Paper,
  CircularProgress,
  FormControl,
  FormHelperText,
  Box,
} from '@mui/material';

const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false });

const schema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.email('Invalid email address').min(1, 'Email is required'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
  token: z.string().min(1, 'reCAPTCHA token is required'),
});

const ContactPage = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    console.log('ContactPage mounted');
    setMounted(true);
  }, []);

  const recaptchaRef = useRef(null);
  const [recaptchaKey, setRecaptchaKey] = useState(0); // key to force remount

  console.log('Rendering recaptcha, mounted:', mounted, 'key:', recaptchaKey);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const [status, setStatus] = useState({
    success: null,
    error: null,
    loading: false,
  });

  // Watch token field from form data:
  const token = watch('token');

  const onSubmit = async (data) => {
    if (!token) {
      return; // token validation handled by zod + RHF, no manual check needed here
    }

    setStatus({ success: null, error: null, loading: true });

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        token,
      }),
    });

    const json = await response.json();

    if (response.ok) {
      setStatus({ success: 'Message sent!', error: null, loading: false });
      reset();

      // Resetting the recaptcha widget
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }

      setValue('token', '');
      setRecaptchaKey((prev) => prev + 1); // force remount of recaptcha component
    } else {
      setStatus({ success: null, error: json.error || 'Failed to send message.', loading: false });
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px - 212px)', // adjusted based on NavBar/Footer height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="sm" sx={{ mt: 10, mb: 6 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Contact Me
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            If you have any questions or would like to order a painting from David McEwen, please
            fill out the form below.
          </Typography>

          {status.success && (
            <Grid sx={{ mb: 4 }}>
              <Alert severity="success">{status.success}</Alert>
            </Grid>
          )}

          {status.error && (
            <Grid sx={{ mb: 4 }}>
              <Alert severity="error">{status.error}</Alert>
            </Grid>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={3} direction="column">
              <Grid>
                <FormControl
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
                    textAlign: 'center',
                  }}
                  fullWidth
                  error={!!errors.email}
                >
                  <TextField fullWidth label="Name" {...register('name')} error={!!errors.name} />

                  {errors.name && (
                    <FormHelperText sx={{ mt: 2 }}>{errors.name?.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid>
                <FormControl
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
                    textAlign: 'center',
                  }}
                  fullWidth
                  error={!!errors.email}
                >
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    {...register('email')}
                    error={!!errors.email}
                  />

                  {errors.email && (
                    <FormHelperText sx={{ mt: 2 }}>{errors.email?.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid>
                <FormControl
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
                    textAlign: 'center',
                  }}
                  fullWidth
                  error={!!errors.message}
                >
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    {...register('message')}
                    error={!!errors.message}
                  />
                  {errors.message && (
                    <FormHelperText sx={{ mt: 2 }}>{errors.message.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 2,
                  textAlign: 'center',
                  opacity: mounted ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out',
                  height: 78,
                  width: '100%',
                }}
              >
                {mounted ? (
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={(value) => setValue('token', value, { shouldValidate: true })}
                    ref={recaptchaRef}
                  />
                ) : (
                  // Render empty div placeholder to keep markup consistent during SSR and hydration
                  <div style={{ height: '78px', width: '304px' }} />
                )}

                {errors.token && (
                  <FormHelperText sx={{ mt: 2 }}>{errors.token.message}</FormHelperText>
                )}
              </Grid>

              <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button type="submit" variant="contained" color="primary" disabled={status.loading}>
                  {status.loading ? <CircularProgress size={24} /> : 'Send Message'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactPage;
