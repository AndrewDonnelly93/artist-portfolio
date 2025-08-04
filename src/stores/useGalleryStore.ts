import { create } from 'zustand';
import { Category } from '@/types/category';

export interface GalleryStore {
  categoryFilter: Category;
  availableForSale: boolean;
  selectedPaintingId: string | null;
  searchQuery: string;

  setCategoryFilter: (category: Category) => void;
  selectPainting: (id: string) => void;
  clearSelectedPainting: () => void;
  setSearchQuery: (query: string) => void;
  setAvailableForSale: (value: boolean) => void;
}

const useGalleryStore = create<GalleryStore>((set) => ({
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
