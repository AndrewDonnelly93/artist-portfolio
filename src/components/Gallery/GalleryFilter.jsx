import {
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
} from '@mui/material';
import useGalleryStore from '@/stores/useGalleryStore';

const GalleryFilter = () => {
  const { categoryFilter, availableForSale, setCategoryFilter, setAvailableForSale } =
    useGalleryStore();

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
          onChange={(e) => setCategoryFilter(e.target.value)}
          label="Category"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Landscapes">Landscapes</MenuItem>
          <MenuItem value="Seascapes">Seascapes</MenuItem>
          <MenuItem value="Portraits">Portraits</MenuItem>
          <MenuItem value="Abstract">Abstract</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Switch
            checked={!!availableForSale}
            onChange={(e) => setAvailableForSale(e.target.checked)}
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
