import React, { PropsWithChildren } from 'react';
import { Box, BoxProps } from '@mui/material';

/**
 * Wrapper component for GatsbyImages that will ensure their width expands
 * to the width of the parent.
 */
export const ResponsiveImageWrapper: React.FC<BoxProps> = ({ sx, children, ...rest }) => {
  return (
    <Box
      {...rest}
      sx={{
        height: '100%',
        '& .gatsby-resp-image-wrapper': {
          height: '100%'
        },
        '& .gatsby-resp-image-wrapper img': {
          width: 'auto !important',
          left: '50% !important',
          transform: 'translate(-50%, 0)'
        },
        '& .gatsby-resp-image-wrapper .gatsby-resp-image-link': {
          width: 'auto !important'
        },
        '& > img': {
          width: '100%',
          height: 'auto',
          cursor: 'pointer',
        },
        ...sx
      }}
    >
      {children}
    </Box>
  );
};