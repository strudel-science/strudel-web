import * as React from 'react';
import { Stack, Typography, Link as MuiLink, Grid, Chip, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import BaseLayout from './BaseLayout';
import { PageHeader } from '../PageHeader';
import { HeadProps, Link, PageProps } from 'gatsby';
import { StyledMarkdown } from '../StyledMarkdown';
import Seo from '../Seo';
import { PageContainer } from '../PageContainer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { ResponsiveImageWrapper } from '../ResponsiveImageWrapper';
import { Button } from 'gatsby-theme-material-ui';
import { Hero } from '../Hero';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { getImageFromFileNode } from '../../utils/utils';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

/**
 * Layout for News pages.
 * News frontmatter data is plugged into this template.
 * News pages are generated dynamically based on the mdx files in /content/engage/news
 */
const GalleryDetailLayout: React.FC<PageProps<any, any>> = ({ pageContext, children }) => {
  const containerWidth = 'md';
  const primaryImage = getImageFromFileNode(pageContext.frontmatter.primaryImage);
  const otherImages = pageContext.frontmatter.otherImages.map((image: any) => {
    return getImageFromFileNode(image);
  });

  return (
    <BaseLayout>
      <PageHeader containerWidth={containerWidth}>
        <Stack spacing={2}>
          <Link to="/gallery">
            <Button 
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIcon />}
            >
              Back to Gallery
            </Button>
          </Link>
          <Typography 
            component="h1"
            variant="h3" 
            fontWeight="bold"
          >
            {pageContext.frontmatter.title}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Chip label={pageContext.frontmatter.appType} variant="outlined" />
            <Typography fontSize="large">
              Contributed by {pageContext.frontmatter.contributors.join(', ')}
            </Typography>
          </Stack>
        </Stack>
      </PageHeader>
      <Hero>
        <Stack spacing={2}>
          {(pageContext.frontmatter.liveUrl || pageContext.frontmatter.repoUrl) && (
            <Stack direction="row" spacing={2}>
              {/* <Chip label={pageContext.frontmatter.appType} variant="outlined" sx={{ color: 'white' }} /> */}
              {pageContext.frontmatter.liveUrl && (
                <MuiLink  href={pageContext.frontmatter.liveUrl} target="_blank">
                  <Button 
                    variant="contained"
                    color="primary"
                    startIcon={<VisibilityIcon />}
                  >
                    Live Demo
                  </Button>
                </MuiLink>
              )}
              {pageContext.frontmatter.repoUrl && (
                <MuiLink  href={pageContext.frontmatter.repoUrl} target="_blank">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CodeIcon />}
                  >
                    Code
                  </Button>
                </MuiLink>
              )}
            </Stack>
          )}
          <StyledMarkdown>
            {children}
          </StyledMarkdown>
        </Stack>
      </Hero>
      <PageContainer maxWidth={containerWidth}>
        <PhotoProvider>
          <PhotoView src={primaryImage?.images.fallback?.src}>
            <ResponsiveImageWrapper sx={{ boxShadow: 3 }}>
              <img src={primaryImage?.images.fallback?.src} alt="Primary Gallery Image" />
            </ResponsiveImageWrapper>
          </PhotoView>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {otherImages.map((image: any, index: number) => (
              <Grid item xs={12} sm={6} key={index}>
                <PhotoView src={image?.images.fallback?.src}>
                  <ResponsiveImageWrapper sx={{ boxShadow: 3 }}>
                    <img 
                      src={image?.images.fallback?.src} 
                      alt={`Gallery Image ${index + 1}`} 
                    />
                  </ResponsiveImageWrapper>
                </PhotoView>
              </Grid>
            ))}
          </Grid>
        </PhotoProvider>
      </PageContainer>
    </BaseLayout>
  )
};

export const Head:React.FC<HeadProps<any, any>> = ({ pageContext }) => {
  return (
    <Seo title={pageContext.frontmatter.title} />
  );
}

export default GalleryDetailLayout;