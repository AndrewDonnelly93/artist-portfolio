import {Box, MenuItem, Select, FormControl, InputLabel, FormControlLabel, Checkbox} from '@mui/material';
import {useGalleryStore} from '../../stores/galleryStore';

const GalleryFilter = () => {
    const { categoryFilter, forSalesFilter, setCategoryFilter, toggleForSalesFilter } = useGalleryStore();
    
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
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
                    <Checkbox
                        checked={forSalesFilter}
                        onChange={toggleForSalesFilter}
                        color="primary"
                    />
                }
                label="Available for sale"
            />
        </Box>
    );
}

 export default GalleryFilter;