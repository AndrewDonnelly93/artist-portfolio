'use client';

import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useGalleryStore from '@/stores/useGalleryStore';

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useGalleryStore();
  const [localQuery, setLocalQuery] = useState<string>(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 300); // Debounce for 300ms

    return () => clearTimeout(handler);
  }, [localQuery]);

  return (
    <TextField
      variant="outlined"
      placeholder="Search paintings..."
      value={localQuery}
      onChange={(e) => setLocalQuery(e.target.value)}
      fullWidth
      sx={{ flexGrow: 1 }}
      slotProps={{ input: { 'aria-label': 'Search paintings' } }}
    />
  );
};

export default SearchBar;
