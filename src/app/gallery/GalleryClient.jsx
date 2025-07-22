'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Pagination, Stack, Fade } from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';
import GalleryFilter from '@/components/Gallery/GalleryFilter';
import GalleryGrid from '@/components/Gallery/GalleryGrid';
import SearchBar from '@/components/SearchBar/SearchBar';
import usePaintingStore from '@/stores/usePaintingStore';
import useGalleryStore from '@/stores/useGalleryStore';
import { filterPaintings } from '@/lib/selectors';

const ITEMS_PER_PAGE = 9;

export default function GalleryClient() {
  const { paintings, loading, error, loadPaintings } = usePaintingStore();
  const hasSyncedFromURL = useRef(false);

  const {
    categoryFilter,
    availableForSale,
    searchQuery,
    setSearchQuery,
    setCategoryFilter,
    setAvailableForSale,
  } = useGalleryStore();

  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(1);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Load paintings on initial render
  useEffect(() => {
    if (paintings.length === 0) {
      loadPaintings();
    }
  }, [loadPaintings, paintings.length]);

  // Sync filters with URL search params
  useEffect(() => {
    if (hasSyncedFromURL.current) return;

    const queryCategory = searchParams.get('category') || 'All';
    const queryForSale = searchParams.get('sale') === 'true';
    const querySearch = searchParams.get('search') || '';
    const queryPage = parseInt(searchParams.get('page')) || 1;

    setCategoryFilter(queryCategory);
    setAvailableForSale(queryForSale);
    setSearchQuery(querySearch);
    setPage(queryPage);

    hasSyncedFromURL.current = true;
  }, [searchParams, setCategoryFilter, setAvailableForSale, setSearchQuery]);

  // Filter paintings and update URL params
  useEffect(() => {
    const filteredPaintings = filterPaintings(paintings, {
      categoryFilter,
      availableForSale,
      searchQuery,
    });

    setFiltered(filteredPaintings);

    const params = new URLSearchParams();
    if (categoryFilter !== 'All') params.set('category', categoryFilter);
    if (availableForSale) params.set('sale', 'true');
    if (searchQuery) params.set('search', searchQuery);
    if (page !== 1) params.set('page', page.toString());

    const newUrl = `/gallery?${params.toString()}`;
    // Check if params really changed
    if (window.location.search !== `?${params.toString()}`) {
      router.replace(newUrl);
    }
  }, [categoryFilter, availableForSale, searchQuery, paintings, page, router]);

  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px - 212px)' }}>
      <Container
        maxWidth="lg"
        sx={{ mt: 10, mb: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant="h3" align="center" gutterBottom>
          Gallery
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          sx={{ mb: 4, width: '100%' }}
        >
          <SearchBar value={searchQuery} />
          <GalleryFilter
            categoryFilter={categoryFilter}
            availableForSale={availableForSale}
            setCategoryFilter={setCategoryFilter}
            setAvailableForSale={setAvailableForSale}
          />
        </Stack>

        {loading ? (
          <Typography variant="h6" align="center" sx={{ mt: 6 }}>
            Loading paintings...
          </Typography>
        ) : error ? (
          <Typography variant="h6" color="error" align="center" sx={{ mt: 6 }}>
            {error}
          </Typography>
        ) : (
          <>
            <Fade in={!loading} timeout={600}>
              <Box sx={{ mb: 4 }}>
                <GalleryGrid paintings={paginated} />
              </Box>
            </Fade>

            <Stack spacing={2} alignItems="center">
              <Pagination
                count={Math.ceil(filtered.length / ITEMS_PER_PAGE)}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                sx={{
                  button: {
                    color: '#fff',
                    borderColor: '#888',
                  },
                  '.Mui-selected': {
                    backgroundColor: '#90caf9',
                    color: '#000',
                    '&:hover': {
                      backgroundColor: '#64b5f6',
                    },
                  },
                }}
              />
            </Stack>
          </>
        )}
      </Container>
    </Box>
  );
}
