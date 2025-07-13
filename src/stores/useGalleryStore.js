import { create } from 'zustand';

const useGalleryStore = create((set) => ({
  categoryFilter: 'All',
  availableForSale: false,
  selectedPaintingId: null,
  searchQuery: '',

  setCategoryFilter: (category) => set({ categoryFilter: category }),
  selectPainting: (id) => set({ selectedPaintingId: id }),
  clearSelectedPainting: () => set({ selectedPaintingId: null }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setAvailableForSale: (value) => set({ availableForSale: value }),
}));

export default useGalleryStore;
