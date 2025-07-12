'use client';

import { Avatar, Typography, Box, Stack, IconButton, Divider } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const ArtistBio = ({ bio }) => {
    if (!bio) return null;

    const { 
        name, 
        description,
        photo, 
        facebookUrl, 
        singulartUrl,
        fineArtAmericaUrl
    } = bio;
    const htmlDescription = documentToHtmlString(description);

    return (
        <Stack spacing={4} alignItems="center" sx={{ py: 8 }}>
            <Avatar
                src={`https:${photo.fields.file.url}`}
                alt={name}
                sx={{ width: 160, height: 160, mb: 2 }}
            />

            <Typography variant="h3" component="h1" align="center" gutterBottom>
                {name}
            </Typography>

            <Box sx={{ maxWidth: 600, textAlign: 'center', px: 2 }}>
                <Typography 
                    component="div"
                    dangerouslySetInnerHTML={{ __html: htmlDescription }}
                    sx={{ 
                        whiteSpace: 'pre-line',
                        lineHeight: 1.6,
                        mb: 3,
                        textAlign: 'left'
                    }}
                />
            </Box>        

            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                Follow {name} on social media:
            </Typography>    

            <Stack direction="row" spacing={2} justifyContent="center">
                {facebookUrl && (
                    <IconButton
                        component="a" 
                        href={facebookUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        color="primary"
                        aria-label="Facebook"
                    >
                        <FacebookIcon />
                    </IconButton>
                )}

                {singulartUrl && (
                    <IconButton 
                        component="a" 
                        href={singulartUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        color="secondary"
                        aria-label="singulart"
                    >
                        <LanguageIcon />
                    </IconButton>
                )}

                {fineArtAmericaUrl && (
                    <IconButton 
                        component="a" 
                        href={fineArtAmericaUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        color="secondary"
                        aria-label="fineArtAmerica"
                    >
                        <LanguageIcon />
                    </IconButton>
                )}
            </Stack>    

            <Divider sx={{ width: '100%', mt: 4 }} />
        </Stack>   
    )
};

export default ArtistBio;