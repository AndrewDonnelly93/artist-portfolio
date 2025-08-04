import { create } from 'zustand';
import { fetchPaintings, Painting } from '@/lib/contentful';

// usePaintingStore.ts
export type PaintingStore = {
  paintings: Painting[] | [];
  loading: boolean;
  error: string | null;
  loadPaintings: () => void;
};

const usePaintingStore = create((set) => ({
  paintings: [],
  loading: false,
  error: null,

  loadPaintings: async () => {
    set({ loading: true, error: null });
    try {
      const paintings = await fetchPaintings();
      set({ paintings, loading: false, error: null });
    } catch (error) {
      console.error('Error fetching paintings:', error);
      set({ error: 'Failed to load paintings.' });
    } finally {
      set({ loading: false });
    }
  },
}));

export default usePaintingStore;
