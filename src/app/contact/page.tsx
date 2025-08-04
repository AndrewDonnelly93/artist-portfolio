'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import dynamic from 'next/dynamic';
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  CircularProgress,
  FormControl,
  FormHelperText,
  Box,
  Grid,
} from '@mui/material';
import type ReCAPTCHAType from 'react-google-recaptcha';

const RawReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false });

type ReCAPTCHAHandles = {
  reset: () => void;
  execute: () => void;
};

const ReCAPTCHA = forwardRef<ReCAPTCHAType, React.ComponentProps<typeof RawReCAPTCHA>>(
  (props, ref) => {
    const innerRef = useRef<ReCAPTCHAType>(null);

    useImperativeHandle(ref, () => innerRef.current as ReCAPTCHAType);
    // @ts-expect-error React-google-recaptcha types do not declare ref, ignore error here
    return <RawReCAPTCHA {...props} ref={innerRef as any} />;
  }
);

// -------------------
// 🔒 Schema + Types
// -------------------

const schema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
  token: z.string().min(1, 'reCAPTCHA token is required'),
});

type ContactFormData = z.infer<typeof schema>;

type StatusState = {
  success: string | null;
  error: string | null;
  loading: boolean;
};

const ContactPage = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const recaptchaRef = useRef<ReCAPTCHAHandles>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const [status, setStatus] = useState<StatusState>({
    success: null,
    error: null,
    loading: false,
  });

  const token = watch('token');

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    if (!token) return;

    setStatus({ success: null, error: null, loading: true });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, token }),
      });

      const json = await response.json();

      if (response.ok) {
        setStatus({ success: 'Message sent!', error: null, loading: false });
        reset();

        if (recaptchaRef.current) {
          recaptchaRef.current?.reset();
        }

        setValue('token', '');
      } else {
        setStatus({
          success: null,
          error: json.error || 'Failed to send message.',
          loading: false,
        });
      }
    } catch (err) {
      setStatus({
        success: null,
        error: 'Something went wrong. Please try again.',
        loading: false,
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px - 212px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="sm" sx={{ mt: 10, mb: 10 }}>
        <Paper
          sx={(theme) => ({
            p: 4,
            backgroundColor: theme.palette.mode === 'dark' ? 'background.paper' : '#fff',
            boxShadow: theme.palette.mode === 'dark' ? '0 0 10px rgba(255,255,255,0.05)' : 3,
          })}
        >
          <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
            Contact Me
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, textAlign: { xs: 'center', sm: 'left' } }}>
            If you have any questions or would like to order a painting from David McEwen, please
            fill out the form below.
          </Typography>

          {status.success && (
            <Grid sx={{ mb: 4 }}>
              <Alert
                severity="success"
                variant="filled"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? theme.palette.success.dark
                      : theme.palette.success.main,
                  color: 'common.white',
                }}
              >
                {status.success}
              </Alert>
            </Grid>
          )}

          {status.error && (
            <Grid sx={{ mb: 4 }}>
              <Alert
                severity="error"
                variant="filled"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? theme.palette.success.dark
                      : theme.palette.success.main,
                  color: 'common.white',
                }}
              >
                {status.error}
              </Alert>
            </Grid>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={3} direction="column">
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth error={!!errors.name}>
                  <TextField
                    fullWidth
                    label="Name"
                    {...register('name')}
                    error={!!errors.name}
                    slotProps={{
                      inputLabel: { style: { color: 'inherit' } },
                    }}
                  />
                  {errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth error={!!errors.email}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    {...register('email')}
                    error={!!errors.email}
                    slotProps={{
                      inputLabel: { style: { color: 'inherit' } },
                    }}
                  />
                  {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth error={!!errors.message}>
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    {...register('message')}
                    error={!!errors.message}
                    slotProps={{
                      inputLabel: { style: { color: 'inherit' } },
                    }}
                  />
                  {errors.message && <FormHelperText>{errors.message.message}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid
                size={{ xs: 12 }}
                sx={(theme) => ({
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: mounted ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out',
                  height: 78,
                  backgroundColor:
                    theme.palette.mode === 'dark' ? 'background.default' : 'transparent',
                  borderRadius: 2,
                  p: 1,
                })}
              >
                {mounted ? (
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    onChange={(value) => setValue('token', value || '', { shouldValidate: true })}
                    // @ts-expect-error React-google-recaptcha types do not declare ref, ignore error here
                    ref={recaptchaRef}
                  />
                ) : (
                  <div style={{ height: '78px', width: '304px' }} />
                )}
                {errors.token && (
                  <FormHelperText sx={{ mt: 2 }}>{errors.token.message}</FormHelperText>
                )}
              </Grid>

              <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={status.loading}
                  sx={{
                    px: 4,
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? theme.palette.primary.light
                        : theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? theme.palette.primary.main
                          : theme.palette.primary.dark,
                    },
                  }}
                >
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
