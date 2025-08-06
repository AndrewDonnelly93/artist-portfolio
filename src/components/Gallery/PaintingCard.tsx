import Link from 'next/link';
import { Card, CardContent, Typography, CardActions, Box, Button, useTheme } from '@mui/material';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Painting } from '@/lib/contentful';

export interface ImageUrl {
  url: string;
  width?: number | null;
  height?: number | null;
}

interface PaintingCardProps {
  painting: Painting;
}

const PaintingCard: React.FC<PaintingCardProps> = ({ painting }) => {
  const theme = useTheme();

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
    slug,
    description,
    printAvailable,
  } = painting;
  const width = imageUrl?.width ?? 345;
  const height = imageUrl?.height ?? 240;

  const isDark = theme.palette.mode === 'dark';

  const onlyOneButton =
    (availableForSale && !printAvailable) || (!availableForSale && printAvailable);

  const buttonStyles = {
    fontWeight: 'bold',
    width: onlyOneButton ? '50%' : 'auto',
    minWidth: 120,
    borderColor: isDark ? 'secondary.light' : 'secondary.main',
    color: isDark ? 'secondary.light' : 'secondary.main',
    '&:hover': {
      backgroundColor: isDark ? 'secondary.dark' : 'secondary.light',
      color: isDark ? 'common.white' : 'common.black',
    },
    flex: availableForSale && printAvailable ? 1 : 'unset',
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxWidth: 345,
        borderRadius: 4,
        boxShadow: 3,
        bgcolor: isDark ? 'background.paper' : 'white',
        color: isDark ? 'text.primary' : 'inherit',
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <Link href={`/paintings/${slug}`} passHref>
        <Box
          sx={{
            position: 'relative',
            width: 345,
            height: 240,
            borderRadius: 2,
            overflow: 'hidden',
            cursor: 'pointer',
            '& img': {
              transition: 'transform 0.3s ease',
              willChange: 'transform',
            },
            '&:hover img': {
              transform: 'scale(1.1)',
            },
          }}
        >
          <Image
            src={imageUrl.url}
            alt={title}
            width={width}
            height={height}
            style={{
              objectFit: 'cover',
              borderRadius: 8,
              width: '100%', // make image fill width
              height: 'auto', // maintain aspect ratio on height
            }}
            sizes="345px"
            priority
          />
        </Box>

        <CardContent>
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography component="div" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {documentToReactComponents(description as any)}
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
        </CardContent>

        {(availableForSale || printAvailable) && (
          <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
            {availableForSale && price && (
              <Button variant="outlined" color="primary" sx={buttonStyles}>
                Buy Original
              </Button>
            )}
            {printAvailable && printPrice && (
              <Button variant="outlined" color="secondary" sx={buttonStyles}>
                Buy Print
              </Button>
            )}
          </CardActions>
        )}
      </Link>
    </Card>
  );
};

export default PaintingCard;
