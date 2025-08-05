import { fetchPaintingBySlug, Painting } from '@/lib/contentful';
import { Box, Typography } from '@mui/material';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import BuyButtons from './BuyButtons';

type Params = Promise<{ slug: string }>;

export default async function PaintingPage({ params }: { params: Params }) {
  const { slug } = await params;
  const painting: Painting | null = await fetchPaintingBySlug(slug);

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
    id,
    printAvailable,
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

      <Box sx={{ mb: 2, typography: 'body1' }}>{documentToReactComponents(description as any)}</Box>

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

      {(availableForSale || printAvailable) && (
        <BuyButtons
          price={price}
          printPrice={printPrice}
          title={title}
          printAvailable={printAvailable}
          availableForSale={availableForSale}
          id={id}
        />
      )}
    </Box>
  );
}
