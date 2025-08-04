'use client';
import React, { FC, useState } from 'react';
import {
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  SelectChangeEvent,
} from '@mui/material';
import useGalleryStore, { GalleryStore } from '@/stores/useGalleryStore';
import { CATEGORY_OPTIONS, Category, isCategory } from '@/types/category';

interface GalleryFilterProps {
  categoryFilter: Category;
  availableForSale: boolean;
  setCategoryFilter: (category: Category) => void;
  setAvailableForSale: (value: boolean) => void;
}

const GalleryFilter: FC<GalleryFilterProps> = () => {
  const {
    categoryFilter,
    availableForSale,
    setCategoryFilter,
    setAvailableForSale,
  }: GalleryFilterProps = useGalleryStore();

  const handleCategoryChange = (event: SelectChangeEvent<Category>) => {
    const newCategory = event.target.value as Category;
    if (isCategory(newCategory)) {
      setCategoryFilter(newCategory);
    } else {
      console.warn(`Invalid category selected: ${newCategory}`);
    }
  };

  const handleAvailableForSaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvailableForSale(event.target.checked);
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      justifyContent="flex-start"
      alignItems="center"
    >
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="category-filter-label">Category</InputLabel>
        <Select
          labelId="category-filter-label"
          value={categoryFilter}
          onChange={handleCategoryChange}
          label="Category"
        >
          {CATEGORY_OPTIONS.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Switch
            checked={!!availableForSale}
            onChange={handleAvailableForSaleChange}
            color="primary"
          />
        }
        label="Available for sale"
        labelPlacement="start"
        sx={{ justifyContent: 'space-between', width: '100%', ml: 0 }}
      />
    </Stack>
  );
};

export default GalleryFilter;
