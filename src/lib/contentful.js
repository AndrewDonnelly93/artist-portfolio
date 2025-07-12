import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const fetchBio = async () => {
  const entries = await client.getEntries({ content_type: 'bio', limit: 1 });
  if (!entries.items.length) return null;
  return entries.items[0].fields;
}

export const fetchPaintings = async () => {
  const entries = await client.getEntries({
    content_type: 'painting',
    order: 'fields.title',
  });
  return entries.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title,
    category: item.fields.category,
    dimensions: item.fields.dimensions,
    description: item.fields.description,
    imageUrl: item.fields.image.fields.file.url,
    printLink: item.fields.printLink || null,
    yearCreated: item.fields.yearCreated,
    availableForSale: item.fields.availableForSale,
    price: item.fields.price,
    materials: item.fields.materials,
    tags: item.fields.tags,
    printPrice: item.fields.printPrice,
    slug: item.fields.slug
  }));
}