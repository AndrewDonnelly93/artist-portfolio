import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const fetchBio = async () => {
  const entries = await client.getEntries({ content_type: 'bio', limit: 1 });
  if (!entries.items.length) return null;
  return entries.items[0].fields;
};

export const fetchPaintings = async () => {
  const entries = await client.getEntries({
    content_type: 'painting',
    order: 'fields.title',
  });

  return entries.items.map((item) => {
    const imageField = item.fields.image;

    const imageUrl = imageField?.fields?.file?.url
      ? {
          url: `https:${imageField.fields.file.url}`,
          width: imageField.fields.file.details?.image?.width || null,
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
      price: item.fields.price,
      materials: item.fields.materials,
      tags: item.fields.tags,
      printPrice: item.fields.printPrice,
      slug: item.fields.slug,
    };
  });
};

export const fetchPaintingBySlug = async (slug) => {
  const entries = await client.getEntries({
    content_type: 'painting',
    'fields.slug': slug,
    limit: 1,
  });

  if (!entries.items.length) return null;

  const item = entries.items[0];
  const imageField = item.fields.image;
  const imageUrl = imageField?.fields?.file?.url
    ? {
        url: `https:${imageField.fields.file.url}`,
        width: imageField.fields.file.details?.image?.width || null,
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
    price: item.fields.price,
    materials: item.fields.materials,
    tags: item.fields.tags,
    printPrice: item.fields.printPrice,
    slug: item.fields.slug,
  };
};
