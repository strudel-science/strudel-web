import * as React from 'react';
import { Box, BoxProps } from '@mui/material';

interface ContentCardProps extends React.PropsWithChildren {
  variant?: 'dark' | 'light' | 'outlined';
}

/**
 * TODO
 */
export const ContentCard: React.FC<ContentCardProps> = ({
  variant = 'dark',
  children
}) => {
  return (
    <Box
      sx={{
        backgroundColor: variant === 'dark' ? 'secondary.main' : variant === 'light' ? 'secondary.light' : 'none',
        borderColor: variant === 'outlined' ? 'primary.main' : 'none',
        borderRadius: 4,
        borderStyle: 'solid',
        borderWidth: 1,
        color: variant === 'outlined' ? 'white' : 'black',
        fontSize: '1rem',
        padding: 3,
      }}
    >
      {children}
    </Box>
  )
}