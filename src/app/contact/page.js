'use client';

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReCAPTCHA from "react-google-recaptcha";
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
    Box
} from "@mui/material";

const schema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    message: z.string().min(10, "Message must be at least 10 characters long"),
    // token: z.string().min(1, "reCAPTCHA token is required")
});

const ContactPage = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        reset
     } = useForm({
        resolver: zodResolver(schema),
        mode: "onBlur"
    });

    const [status, setStatus] = useState({
        success: null,
        error: null,
        loading: false
    });

    // const [token, setToken] = useState(null);

    const onSubmit = async (data) => {
        // if (!token) {
        //     setStatus({ success: null, error: "Please complete the reCAPTCHA.", loading: false });
        //     return;
        // }

        setStatus({ success: null, error: null, loading: true });

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...data
                //, token 
                })
        });

        console.log('Raw fetch response ', response);

        const json = await response.json();
        console.log('Parsed JSON response ', json)

        if (response.ok) {
            setStatus({ success: "Message sent!", error: null, loading: false });
            reset();
            //setToken(null);
        } else {
            setStatus({ success: null, error: json.error || "Failed to send message.", loading: false });
        }
    };

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 64px - 212px)', // adjusted based on NavBar/Footer height
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 6
            }}
        >
            <Container maxWidth="sm" sx={{ mt: 10, mb: 6 }}>
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Contact Me
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        If you have any questions or would like to order a painting from David McEwen, please fill out the form below.
                    </Typography>

                    {status.success  && 
                        <Grid sx={{ mb: 4 }}><Alert severity="success">{status.success}</Alert></Grid>
                    }

                    {status.error &&
                        <Grid sx={{ mb: 4 }}><Alert severity="error">{status.error}</Alert></Grid>
                    }

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Grid container spacing={3} direction="column">
                            <Grid>
                                <FormControl fullWidth error={!!errors.name}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        {...register("name")}
                                        error={!!errors.name}
                                    />

                                    {errors.name && (
                                        <FormHelperText>{errors.name?.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            
                            <Grid>
                                <FormControl fullWidth error={!!errors.name}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        {...register("email")}
                                        error={!!errors.email}
                                    />

                                    {errors.email && (
                                        <FormHelperText>{errors.email?.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                                
                            <Grid>
                                <FormControl fullWidth error={!!errors.message}>
                                    <TextField
                                        fullWidth
                                        label="Message"
                                        multiline
                                        rows={4}
                                        {...register("message")}
                                        error={!!errors.message}
                                    />
                                        {errors.message &&
                                            <FormHelperText>{errors.message.message}</FormHelperText>
                                        }
                                    </FormControl>
                            </Grid>

                            {/* <Grid sx={{ textAlign: 'center' }}>
                                {typeof window !== 'undefined' && (
                                    <ReCAPTCHA
                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                        onChange={(value) => setToken(value)}
                                    />
                                )}

                                {errors.token && (
                                    <FormHelperText>{errors.token.message}</FormHelperText>
                                )}
                            </Grid> */}
                            
                            <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Button
                                    type="submit" 
                                    variant="contained" 
                                    color="primary" 
                                    disabled={status.loading}
                                    onClick={() => console.log('was submitted')}
                                >
                                    {status.loading ? <CircularProgress size={24} /> : "Send Message"}
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