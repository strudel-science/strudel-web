import React, { PropsWithChildren } from 'react';
import { Box } from '@mui/material';

/**
 * Wrapper component for 
 */
export const ResponsiveImageWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
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
      }}
    >
      {children}
    </Box>
  );
};