import * as React from 'react';
import { Box, BoxProps } from '@mui/material';

interface ContentCardProps extends BoxProps {
  variant?: 'dark' | 'light' | 'outlined' | 'dot-outlined';
}

/**
 * TODO
 */
export const ContentCard: React.FC<ContentCardProps> = ({
  variant = 'dark',
  children,
  sx,
  ...rest
}) => {
  return (
    <Box
      {...rest}
      sx={{
        backgroundColor: variant === 'dark' ? 'secondary.main' : variant === 'light' ? 'neutral.main' : 'none',
        borderColor: variant === 'dot-outlined' ? 'error.main' : 'primary.main',
        borderRadius: 4,
        borderStyle: variant === 'dot-outlined' ? 'dotted' : 'solid',
        borderWidth: variant === 'outlined' ? 1 : variant === 'dot-outlined' ? 2 : 0,
        color: variant === 'outlined' ? 'inherit' : 'black',
        fontSize: '1rem',
        padding: 3,
        ...sx
      }}
    >
      {children}
    </Box>
  )
}