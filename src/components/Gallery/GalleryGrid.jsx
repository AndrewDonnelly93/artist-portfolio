'use client';

import { Grid, Typography } from "@mui/material";
import PaintingCard from "./PaintingCard";

const GalleryGrid = ({ paintings }) => {
    if (!paintings || paintings.length === 0) {
        return (
            <Grid container spacing={4} justifyContent="center">
                <Grid>
                    <Typography variant="h6" color="text.secondary" align="center">
                        No paintings found.
                    </Typography>
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container spacing={4} justifyContent="center">
            {paintings.map((painting) => (
                <Grid key={`${painting.id}${painting.slug}`}>
                    <PaintingCard painting={painting} />
                </Grid>
            ))}
        </Grid>
    );
}

export default GalleryGrid;