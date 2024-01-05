import React, { PropsWithChildren, ReactNode } from 'react';
import { Grid, Typography } from '@mui/material';
import { StaticImage } from 'gatsby-plugin-image';

interface CardGridProps {
  cards: ReactNode[];
}

/**
 * Simplified grid component that renders cards in 
 * a 3-column grid.
 * TODO: Might remove this component.
 */
export const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
  return (
    <Grid
      container
      spacing={4}
    >
      {cards.map((card) => (
        <Grid item md={4}>
          {card}
        </Grid>
      ))}
    </Grid>
  );
};