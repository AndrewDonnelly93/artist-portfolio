import contentfulManagement from 'contentful-management';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.local' });

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
if (!SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID environment variable is not defined.');
}

const ENVIRONMENT_ID = 'master';

const getAssetIds = async () => {
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);

  const assets = await environment.getAssets({ limit: 1000 }); // increase if needed
  const assetIds = assets.items.map((asset) => asset.sys.id);

  console.log(`Fetched ${assetIds.length} asset IDs`);
  return assets.items.map((asset) => ({
    id: asset.sys.id,
    title: asset.fields.title['en-US'],
    url: asset.fields.file['en-US'].url,
    width: asset.fields.file['en-US'].details?.image?.width,
    height: asset.fields.file['en-US'].details?.image?.height,
  }));
};

const generatePaintings = async () => {
  const assets = await getAssetIds();

  const paintings = assets.map((asset, i) => {
    const { id, title, url, width, height } = asset;

    return {
      fields: {
        title: {
          'en-US': `Painting ${i + 1}`,
        },
        slug: {
          'en-US': `painting-${i + 1}`,
        },
        description: {
          'en-US': {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: 'Description coming soon.',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
            ],
          },
        },
        yearCreated: {
          'en-US': 2000 + (i % 23),
        },
        dimensions: {
          'en-US': `${30 + i} x ${40 + i} cm`,
        },
        category: {
          'en-US': ['Landscapes', 'Portraits', 'Seascapes', 'Abstract'][i % 4],
        },
        availableForSale: {
          'en-US': i % 2 === 0,
        },
        price: {
          'en-US': i % 2 === 0 ? 100 + i * 20 : 0,
        },
        printAvailable: {
          'en-US': i % 2 === 0,
        },
        printPrice: {
          'en-US': i % 2 === 0 ? 50 + i * 10 : 0,
        },
        materials: {
          'en-US': ['Oil on Canvas', 'Acrylic', 'Watercolor', 'Mixed Media'][i % 4],
        },
        image: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: asset.id,
            },
          },
        },
      },
    };
  });

  return paintings;
};

const seedPaintings = async () => {
  try {
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);
    console.log(`Seeding paintings in environment: ${ENVIRONMENT_ID}`);

    const paintings = await generatePaintings();
    console.log(`Total paintings to seed: ${paintings.length}`);
    for (const painting of paintings) {
      const entry = await environment.createEntry('painting', painting);
      await entry.publish();
      console.log(`Created and published: ${painting.fields.title['en-US']}`);
    }

    console.log('All paintings seeded successfully.');
  } catch (error) {
    console.error('Error seeding paintings:', error);
  }
};

seedPaintings();
