import * as React from 'react';
import { Container, ContainerProps } from '@mui/material';
import { StyledMarkdown } from './StyledMarkdown';

/**
 * Common Container component to be used in page content areas and sections.
 * This helps ensure container width is consistent across different page sections.
 */
export const PageContainer: React.FC<ContainerProps> = ({ children, ...rest }) => {
  return (
    <Container
      component="article" 
      maxWidth="md"
      sx={{
        paddingBottom: 4,
        paddingTop: 4,
      }}
      {...rest}
    >
      <StyledMarkdown>
        {children}  
      </StyledMarkdown>
    </Container>
  )
};