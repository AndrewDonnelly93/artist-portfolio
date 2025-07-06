import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
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
    purchaseLink: item.fields.purchaseLink,
    printLink: item.fields.printLink || null,
  }));
}