'use client';

import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import useGalleryStore from "@/stores/useGalleryStore";

const SearchBar = () => {
    const { searchQuery, setSearchQuery } = useGalleryStore();
    const [localQuery, setLocalQuery] = useState(searchQuery);

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
        />
    );
};

export default SearchBar;