import contentfulManagement from 'contentful-management';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;

if (!SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID environment variable is not defined.');
}
const ENVIRONMENT_ID = 'master';

const assetIds = [
  '69iZflTVA2rz35DQKUFLBk',
  '1zZc2GhQ5dURAcw21pf9U5',
  '6jiQcMNaAALjy0nC1IGSvI',
  'hiUxRbIMSDB8fa5Emrty0',
  'QZflWr8dGv5N0VAvvXBas',
  '7mBUBnhXab7h0J7uV8X5iu',
  '12hI4d6dN7DM5uIpac6NgJ',
  '3WP2VG7gaJtOmrWUJvwGHt',
  'X2ecaGuZv2WHkZyvCVQpo',
  '4tyU1cMROFbVE7o9aBjYZI'
]

const paintings = Array.from({ length: 30 }).map((_, i) => ({
  title: `Painting ${i + 1}`,
  description: {
    nodeType: 'document',
    data: {},
    content: [
      {
        nodeType: 'paragraph',
        data: {}, 
        content: [
          {
            nodeType: 'text',
            value: `This is a description for Painting ${i + 1}. Beautiful artwork!`,
            marks: [],
            data: {},
          },
        ],
        data: {},
      },
    ],
  },
  category: ['Landscapes', 'Portraits', 'Seascapes', 'Abstract'][i % 4],
  yearCreated: 2000 + (i % 23),
  dimensions: `${30 + i} x ${40 + i} cm`,
  externalUrl: i % 3 === 0 ? `https://example.com/painting${i + 1}` : '',
  availableForSale: i % 2 === 0,
  price: i % 2 === 0 ? 100 + i * 20 : 0,
  materials: ['Oil on Canvas', 'Acrylic', 'Watercolor', 'Mixed Media'][i % 4],
  tags: ['modern', 'colorful', 'classic', 'minimalist'][i % 4],
}));

async function seed() {
  try {
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);
    console.log(`Seeding paintings in environment: ${ENVIRONMENT_ID}`);
    console.log(`Total paintings to seed: ${paintings.length}`);

    for (let i = 0; i < paintings.length; i++) {
      const painting = paintings[i];
      const assetId = assetIds[i % assetIds.length];

      const entry = await environment.createEntry('painting', {
        fields: {
          title: { 'en-US': painting.title },
          description: { 'en-US': painting.description },
          category: { 'en-US': painting.category },
          yearCreated: { 'en-US': painting.yearCreated },
          dimensions: { 'en-US': painting.dimensions },
          externalUrl: { 'en-US': painting.externalUrl },
          availableForSale: { 'en-US': painting.availableForSale },
          price: { 'en-US': painting.price },
          materials: { 'en-US': painting.materials },
          tags: { 'en-US': painting.tags },
          image: {
            'en-US': {
              sys: {
                type: 'Link',
                linkType: 'Asset',
                id: assetId,
              },
            },
          },
        },
      });

      await entry.publish();
      console.log(`Created and published: ${painting.title}`);
    }
  } catch (error) {
    console.error('Error seeding paintings:', error);
  }
}

seed();