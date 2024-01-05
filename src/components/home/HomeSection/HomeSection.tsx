import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import { PageSection } from '../../PageSection';

interface HomeSectionProps extends PropsWithChildren {
   variant?: 'light' | 'dark';
   borderPosition?: 'left' | 'right';
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  variant = 'light',
  borderPosition,
  children
}) => {
  return (
    <PageSection
      containerWidth="lg"
      sideRibbon={borderPosition}
      sx={{
        backgroundColor: variant === 'dark' ? 'info.main' : 'white',
        color: variant === 'dark' ? 'white' : 'black',
        paddingBottom: 8,
        paddingTop: 8,
        position: 'relative',
        '@media (max-width: 1300px)': {
          paddingLeft: 8,
          paddingRight: 8,
        },
      }}
    >
      {children} 
    </PageSection>
  );
};