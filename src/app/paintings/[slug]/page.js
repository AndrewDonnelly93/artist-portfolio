import { fetchPaintingBySlug } from '@/lib/contentful';
import { Box, Typography, Button, Chip, Stack } from '@mui/material';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';

const PaintingPage = async ({ params }) => {
  const { slug } = await params;
  const painting = await fetchPaintingBySlug(slug);

  if (!painting || !painting.imageUrl) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4">Painting not found</Typography>
      </Box>
    );
  }

  const {
    title,
    category,
    dimensions,
    description,
    imageUrl,
    yearCreated,
    availableForSale,
    price,
    printPrice,
    materials,
    tags,
  } = painting;

  const width = imageUrl.width || 800;
  const height = imageUrl.height || 600;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 'auto',
          aspectRatio: `${width}/${height}`,
          mb: 4,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Image
          src={imageUrl.url}
          alt={title}
          fill
          style={{ objectFit: 'contain', borderRadius: 8 }}
          sizes="(max-width: 900px) 100vw, 900px"
          priority
        />
      </Box>

      <Box sx={{ mb: 2, typography: 'body1' }}>{documentToReactComponents(description)}</Box>

      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Category:</strong> {category}
      </Typography>

      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Dimensions:</strong> {dimensions}
      </Typography>

      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Year:</strong> {yearCreated}
      </Typography>

      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Materias:</strong> {materials}
      </Typography>

      {availableForSale && (
        <Box sx={{ mt: 2 }}>
          {price && (
                      <Button variant="contained" color="primary" sx={{ mr: 2; mb: 2 }}>
              Buy Original (€{price})
            </Button>
          )}
          {printPrice && (
                      <Button sx={{mb:2}} variant="outlined" color="secondary">
              Buy Print (€{printPrice})
            </Button>
          )}
        </Box>
      )}

      {tags && tags.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mt: 2 }}>
            <Chip label={tags} size="small" variant="outlined" />
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default PaintingPage;
