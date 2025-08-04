import { createClient, Entry } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? '',
});

interface ImageField {
  fields: {
    file: {
      url: string;
      details?: {
        image?: {
          width?: number;
          height?: number;
        };
      };
    };
  };
}

export interface Painting {
  contentTypeId: 'painting';
  id: string;
  title: string;
  category: string;
  dimensions?: string;
  description?: string;
  image: ImageField;
  imageUrl: {
    url: string;
    width: number | null;
    height: number | null;
  };
  yearCreated?: string;
  availableForSale: boolean;
  printAvailable: boolean;
  price?: number;
  materials?: string;
  printPrice?: number;
  slug?: string;
  fields: {
    id: string;
    title: string;
    category: string;
    dimensions?: string;
    description?: string;
    image: ImageField;
    imageUrl: {
      url: string;
      width: number | null;
      height: number | null;
    };
    yearCreated?: string;
    availableForSale: boolean;
    printAvailable: boolean;
    price?: number;
    materials?: string;
    printPrice?: number;
    slug?: string;
  };
}

export interface BioFields {
  contentTypeId: 'bio';
  fields: {
    [key: string]: any;
  };
  name: string;
  description: string;
  photo: ImageField;
  facebookUrl?: string;
  singulartUrl?: string;
  fineArtAmericaUrl?: string;
}

export const fetchBio = async (): Promise<BioFields | null> => {
  const entries = await client.getEntries<BioFields>({ content_type: 'bio', limit: 1 });
  if (!entries.items.length) return null;
  // @ts-expect-error Contentful types may not match exactly
  return entries.items[0].fields;
};

export const fetchPaintings = async (): Promise<Painting[]> => {
  const entries = await client.getEntries({
    content_type: 'painting',
    // @ts-expect-error Contentful types may not match exactly
    order: 'fields.title',
  });

  // @ts-expect-error
  return entries.items.map((item: Entry<Painting>) => {
    const imageField = item.fields.image;

    // @ts-expect-error
    const imageUrl = imageField?.fields?.file?.url
      ? {
          // @ts-expect-error
          url: `https:${imageField.fields.file.url}`,
          // @ts-expect-error
          width: imageField.fields.file.details?.image?.width || null,
          // @ts-expect-error
          height: imageField.fields.file.details?.image?.height || null,
        }
      : {
          url: 'https://placehold.co/600x400',
          width: 600,
          height: 400,
        };

    return {
      id: item.sys.id,
      title: item.fields.title,
      category: item.fields.category,
      dimensions: item.fields.dimensions,
      description: item.fields.description,
      imageUrl,
      yearCreated: item.fields.yearCreated,
      availableForSale: Boolean(item.fields.availableForSale),
      printAvailable: Boolean(item.fields.printAvailable),
      price: item.fields.price,
      materials: item.fields.materials,
      printPrice: item.fields.printPrice,
      slug: item.fields.slug,
    };
  });
};

export const fetchPaintingBySlug = async (slug: string): Promise<Painting | null> => {
  const entries = await client.getEntries<Painting>({
    content_type: 'painting',
    // @ts-expect-error Contentful types may not match exactly
    'fields.slug': slug,
    limit: 1,
  });

  if (!entries.items.length) return null;

  const item = entries.items[0];
  const imageField = item.fields.image;
  // @ts-expect-error Contentful types may not match exactly
  const imageUrl = imageField?.fields?.file?.url
    ? {
        // @ts-expect-error
        url: `https:${imageField.fields.file.url}`,
        // @ts-expect-error
        width: imageField.fields.file.details?.image?.width || null,
        // @ts-expect-error
        height: imageField.fields.file.details?.image?.height || null,
      }
    : {
        url: 'https://placehold.co/600x400',
        width: 600,
        height: 400,
      };

  // @ts-expect-error Contentful types may not match exactly
  return {
    id: item.sys.id,
    title: item.fields.title,
    category: item.fields.category,
    dimensions: item.fields.dimensions,
    description: item.fields.description,
    imageUrl,
    yearCreated: item.fields.yearCreated,
    availableForSale: Boolean(item.fields.availableForSale),
    printAvailable: Boolean(item.fields.printAvailable),
    price: item.fields.price,
    materials: item.fields.materials,
    printPrice: item.fields.printPrice,
    slug: item.fields.slug,
  };
};
