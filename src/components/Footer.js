'use client';
import { Container, Typography, Stack, Box, Link } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';

const Footer = ({bio}) => {
    const { name, facebookUrl, singulartUrl, fineArtAmericaUrl } = bio;

    return (
        <Box component="footer" sx={{ backgroundColor: '#f5f5f5', py: 4, mt: 8 }}>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                © {new Date().getFullYear()} {name}. All rights reserved.
            </Typography>

            <Container maxWidth="md" sx={{ mb: 2}}>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2, mb: 2 }}>
                    Follow {name} on:
                </Typography>    

                <Stack direction="row" spacing={2} sx={{ mb: 2 }} justifyContent="center">
                    {facebookUrl && (
                        <Link
                            href={facebookUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            color="inherit"
                            underline="always"
                            aria-label="Facebook"
                        >
                            <FacebookIcon sx={{ mr: 1}} />
                            Facebook
                        </Link>
                    )}

                    {singulartUrl && (
                        <Link 
                            href={singulartUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="singulart"
                            color="inherit"
                            underline="always"
                        >
                            <LanguageIcon sx={{ mr: 1 }} />
                            Singulart Gallery
                        </Link>
                    )}

                    {fineArtAmericaUrl && (
                        <Link 
                            href={fineArtAmericaUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="fineArtAmerica"
                            color="inherit"
                            underline="always"
                        >
                            <LanguageIcon sx={{ mr: 1 }} />
                            Fine Art America
                        </Link>
                    )}
                </Stack>    

                <Typography variant="body2" color="text.secondary" align="center">
                    Built with Next.js & Contentful by&nbsp;
                    <Link
                        href={`https://www.linkedin.com/in/andrewdonnelly93/`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        color="inherit"
                        underline="always"
                        aria-label="Andrew Donnelly"
                    >
                        Andrew Donnelly
                    </Link>
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;