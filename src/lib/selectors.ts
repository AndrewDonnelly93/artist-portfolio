import { Painting } from '@/lib/contentful';
import { Category } from '@/types/category';

interface FilterOptions {
  categoryFilter: Category;
  availableForSale: boolean;
  searchQuery: string;
}

export const filterPaintings = (
  paintings: Painting[] | [],
  { categoryFilter, availableForSale, searchQuery }: FilterOptions
): Painting[] => {
  const lowerSearchQuery = searchQuery?.toLowerCase() || '';

  return paintings.filter((painting) => {
    const matchesCategory = categoryFilter === 'All' || painting.category === categoryFilter;
    // availableForSale is filterForSale
    const matchesForSale = !availableForSale || painting.availableForSale === true;

    const title = painting.title?.toLowerCase() || '';
    // @ts-expect-error Content may not always be defined
    const description = painting.description?.content?.[0].content?.[0]?.value?.toLowerCase() || '';

    const matchesSearch =
      title.includes(lowerSearchQuery) || description.includes(lowerSearchQuery);

    return matchesCategory && matchesForSale && matchesSearch;
  });
};
