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
        slug
    } = painting;
    
    return (
        <Link href={`/paintings/${slug}`} passHref>
            <Card sx={{ maxWidth: 345, borderRadius: 4, boxShadow: 3 }}>
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
                    <Typography variant="body2" color="text.secondary">
                        {category} • {yearCreated} • {dimensions}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Materials: {materials.join(', ')}
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
                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mt}}>
                                {tags.map((tag, index) => (
                                    <Chip key={index} label={tag} size="small" variant="outlined" />
                                ))}
                            </Stack>
                        </Box>
                    )}

                </CardContent>  
                <CardActions>
                    {painting.availableForSale && (
                        <Button size="small" color="secondary">Buy Now</Button>
                    )}
                </CardActions>
            </Card>
        </Link>
    );
}

export default PaintingCard;