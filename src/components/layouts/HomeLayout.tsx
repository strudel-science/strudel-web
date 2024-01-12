import * as React from 'react';
import BaseLayout from './BaseLayout';
import { HeadProps, PageProps } from 'gatsby';
import { StyledMarkdown } from '../StyledMarkdown';
import Seo from '../Seo';

/**
 * Layout for the home page.
 * Includes everything in the BaseLayout minus the breadcrumbs.
 * Markdown content is rendered underneath using the children prop.
 */
const HomeLayout: React.FC<PageProps<any, any>> = ({ children }) => {
  return (
    <BaseLayout hasBreadcrumbs={false}>
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

export default HomeLayout;