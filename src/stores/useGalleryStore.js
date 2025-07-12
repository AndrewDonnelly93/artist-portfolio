import create from 'zustand';

export const useGalleryStore = create((set) => ({
    categoryFilter: 'All',
    forSalesFilter: false,
    selectedPaintingId: null,

    setCategoryFilter: (category) => set({ categoryFilter: category }),
    toggleForSalesFilter: () => set((state) => ({ forSalesFilter: !state.forSalesFilter })),
    selectPainting: (id) => set({ selectedPaintingId: id }),
    clearSelectedPainting: () => set({ selectedPaintingId: null }),
}));