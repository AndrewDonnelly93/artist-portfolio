export const filterPaintings = (paintings, { categoryFilter, availableForSale, searchQuery }) => {
    const lowerSearchQuery = searchQuery?.toLowerCase() || '';

    return paintings.filter(painting => {
        const matchesCategory = categoryFilter === 'All' || painting.category === categoryFilter;
        // availableForSale is filterForSale
        const matchesForSale = !availableForSale || painting.availableForSale === true;

        const title = painting.title?.toLowerCase() || '';
        const description = painting.description?.content?.[0].content?.[0]?.value?.toLowerCase() || '';

        const matchesSearch =
         title.includes(lowerSearchQuery) ||
         description.includes(lowerSearchQuery);
        
        return matchesCategory && matchesForSale && matchesSearch;
    });
};