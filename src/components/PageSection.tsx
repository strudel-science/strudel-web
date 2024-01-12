import * as React from 'react';
import { Box, Container, Breakpoint, BoxProps } from '@mui/material';
import { PageContainer } from './PageContainer';

export interface PageSectionProps extends BoxProps {
  /** Optionally wrap the inner content in its own container and give it a max width. */
  containerWidth?: false | Breakpoint | undefined;
  /** Optionally include red ribbon on the left or right side */
  sideRibbon?: 'left' | 'right';
}

/**
 * Generic wrapper component for sections in a page.
 */
export const PageSection: React.FC<PageSectionProps> = ({
  containerWidth = 'md',
  sideRibbon,
  children,
  sx,
  ...rest
}) => {
  return (
    <Box
      component="section"
      sx={{
        paddingBottom: 4,
        paddingTop: 4,
        position: 'relative',
        ...sx
      }} 
      {...rest}
    >
      {sideRibbon && (
        <Box
          sx={{
            backgroundColor: 'error.main',
            height: '100%',
            left: sideRibbon === 'left' ? 0 : 'auto',
            position: 'absolute',
            right: sideRibbon === 'right' ? 0 : 'auto',
            top: 0,
            width: '20px',
          }}
        />
      )}
      <PageContainer
        component="div"
        maxWidth={containerWidth}
        sx={{
          paddingBottom: 0,
          paddingTop: 0,
        }}
      >
        {children} 
      </PageContainer>
    </Box>
  );
};