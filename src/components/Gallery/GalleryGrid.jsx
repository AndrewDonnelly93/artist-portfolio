'use client';

import { Grid } from "@mui/material";
import PaintingCard from "./PaintingCard";

const GalleryGrid = ({ paintings }) => {
    return (
        <Grid container spacing={4} justifyContent="center">
            {paintings.map((painting) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={`${painting.id}${painting.slug}`}>
                    <PaintingCard painting={painting} />
                </Grid>
            ))}
        </Grid>
    );
}

export default GalleryGrid;