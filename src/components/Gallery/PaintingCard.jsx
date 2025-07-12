'use client';
import Link from 'next/link';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Chip,
    Box,
    Stack,
    Button
} from '@mui/material';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const PaintingCard = ({ painting }) => {
    const { 
        title, 
        category,
        dimensions,
        imageUrl, 
        yearCreated,
        availableForSale,
        price,
        printPrice,
        materials,
        tags,
        slug,
        description
    } = painting;

    return (
            <Card sx={{
                 display: 'flex', 
                 flexDirection: 'column', 
                 height: '100%',
                 maxWidth: 345, 
                 borderRadius: 4, 
                 boxShadow: 3 
            }}>
                <Link href={`/paintings/${slug}`} passHref>
                    <CardMedia
                        component="img"
                        height="240"
                        image={`https:${imageUrl}`}
                        alt={title}
                        sx={{cursor: 'pointer', objectFit: 'cover'}}
                    />

                    <CardContent>
                        <Typography gutterBottom variant="h6">
                            {title}
                        </Typography>
                        <Typography component="div" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {documentToReactComponents(description)}    
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {category} • {yearCreated} • {dimensions}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Materials: {materials}
                        </Typography>

                        {availableForSale && price && (
                            <Typography variant="subtitle2" color="text.primary" sx={{ mt: 1 }}>
                                Original: €{price}
                            </Typography>
                        )}

                        {availableForSale && printPrice && (
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                                Print: €{printPrice}
                            </Typography>
                        )}

                        {tags && tags.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mt: 2}}>
                                    <Chip label={tags} size="small" variant="outlined" />
                                </Stack>
                            </Box>
                        )}

                    </CardContent>  
                    <CardActions>
                        {painting.availableForSale && (
                            <Button size="small" color="secondary">Buy Now</Button>
                        )}
                    </CardActions>
                </Link>
            </Card>
    );
}

export default PaintingCard;