import {create} from 'zustand';
import {fetchBio} from '@/lib/contentful';

const useBioStore = create((set) => ({
    bio: null,
    loading: false, 
    error: null,

    loadBio: async () => { 
        set({ loading: true, error: null });
        try {
            const bio = await fetchBio();
            set({ bio, loading: false, error: null });
        } catch (error) {
            console.error("Error fetching bio:", error);
            set({ error: "Failed to load bio." });
        } finally {
            set({ loading: false });
        }
    }
}));

export default useBioStore;