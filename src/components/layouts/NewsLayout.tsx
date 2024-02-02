import * as React from 'react';
import { Stack, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import BaseLayout from './BaseLayout';
import { PageHeader } from '../PageHeader';
import { HeadProps, PageProps } from 'gatsby';
import { StyledMarkdown } from '../StyledMarkdown';
import Seo from '../Seo';
import { PageContainer } from '../PageContainer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { ResponsiveImageWrapper } from '../ResponsiveImageWrapper';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

/**
 * Layout for News pages.
 * News frontmatter data is plugged into this template.
 * News pages are generated dynamically based on the mdx files in /content/engage/news
 */
const NewsLayout: React.FC<PageProps<any, any>> = ({ pageContext, children }) => {
  // const thumbnailImg = getImageFromFileNode(pageContext.frontmatter.thumbnail);
  const containerWidth = 'md';
  return (
    <BaseLayout>
      <PageHeader containerWidth={containerWidth}>
        <Stack spacing={2}>
          <Typography 
            component="h1"
            variant="h3" 
            fontWeight="bold"
          >
            {pageContext.frontmatter.title}
          </Typography>
          <Stack 
            direction="row"
            spacing={1}
            sx={{
              fontSize: '1.25rem',
              alignItems: 'center',
            }}
          >
            <span>{dayjs(pageContext.frontmatter.date).format('MMMM D, YYYY')}</span>
            <CircleIcon sx={{ fontSize: '0.75rem' }} />
            <span>{pageContext.frontmatter.author}</span>
          </Stack>
        </Stack>
      </PageHeader>
      <PageContainer maxWidth={containerWidth}>
        <StyledMarkdown>
          {children}
        </StyledMarkdown>
      </PageContainer>
    </BaseLayout>
  )
};

export const Head:React.FC<HeadProps<any, any>> = ({ pageContext }) => {
  return (
    <Seo title={pageContext.frontmatter.title} />
  );
}

export default NewsLayout;