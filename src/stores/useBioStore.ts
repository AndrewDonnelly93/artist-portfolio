import { create } from 'zustand';
import { fetchBio, BioFields } from '@/lib/contentful';

interface BioStore {
  bio: BioFields | null;
  loading: boolean;
  error: string | null;
  loadBio: () => Promise<void>;
}

const useBioStore = create<BioStore>((set) => ({
  bio: null,
  loading: false,
  error: null,

  loadBio: async () => {
    set({ loading: true, error: null });
    try {
      const bio = await fetchBio();
      set({ bio, loading: false, error: null });
    } catch (error) {
      console.error('Error fetching bio:', error);
      set({ error: 'Failed to load bio.' });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useBioStore;
