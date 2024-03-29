import * as React from 'react';
import { Stack, Typography } from '@mui/material';
import BaseLayout from './BaseLayout';
import { PageHeader } from '../PageHeader';
import { HeadProps, PageProps } from 'gatsby';
import { StyledMarkdown } from '../StyledMarkdown';
import Seo from '../Seo';

/**
 * Layout for general pages.
 * Includes everything in the BaseLayout plus a sidebar and PageHeader section.
 * Markdown content is rendered underneath the PageHeader using the children prop.
 */
const PageLayout: React.FC<PageProps<any, any>> = ({ pageContext, children }) => {
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

export const Head:React.FC<HeadProps<any, any>> = ({ pageContext }) => {
  return (
    <Seo title={pageContext.frontmatter.title} />
  );
}

export default PageLayout;