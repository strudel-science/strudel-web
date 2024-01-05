import * as React from 'react';
import { Container, Stack, Typography } from '@mui/material';
import BaseLayout from './BaseLayout';
import { PageHeader } from '../PageHeader';
import { PageProps } from 'gatsby';
import { StyledMarkdown } from '../StyledMarkdown';

const SidebarLayout: React.FC<PageProps<any, any>> = ({ pageContext, children }) => {
  return (
    <BaseLayout hasSidebar>
      <PageHeader>
        <Stack spacing={2}>
          <Typography 
            component="h1"
            variant="h3" 
            fontWeight="bold"
          >
            {pageContext.frontmatter.title}
          </Typography>
          <Typography 
            variant="h6" 
            fontWeight="normal"
          >
            {pageContext.frontmatter.subtitle}
          </Typography>
        </Stack>
      </PageHeader>
      <StyledMarkdown>
        {children}
      </StyledMarkdown>
    </BaseLayout>
  )
};

export default SidebarLayout;