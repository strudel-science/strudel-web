import * as React from 'react';
import { Box, Grid, Stack, Typography, Link as MuiLink } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import VideocamIcon from '@mui/icons-material/Videocam';
import CircleIcon from '@mui/icons-material/Circle';
import BaseLayout from './BaseLayout';
import { PageHeader } from '../PageHeader';
import { HeadProps, PageProps } from 'gatsby';
import { Button } from 'gatsby-theme-material-ui';
import { StyledMarkdown } from '../StyledMarkdown';
import Seo from '../Seo';
import { PageContainer } from '../PageContainer';
import { Hero } from '../Hero';
import { getImageFromFileNode } from '../../utils/utils';
import { GatsbyImage } from 'gatsby-plugin-image';

/**
 * Layout for Event pages.
 * Event frontmatter data is plugged into this template.
 * Main markdown content is rendered underneath the "About this Event" heading.
 * Event pages are generated dynamically based on the event files in /content/engage/events
 */
const EventLayout: React.FC<PageProps<any, any>> = ({ pageContext, children }) => {
  const thumbnailImg = getImageFromFileNode(pageContext.frontmatter.image);
  const containerWidth = 'lg';
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
            <span>{pageContext.frontmatter.date}</span>
            <CircleIcon sx={{ fontSize: '0.75rem' }} />
            <span>{pageContext.frontmatter.format}</span>
          </Stack>
        </Stack>
      </PageHeader>
      <Hero containerWidth={containerWidth}>
        <Grid container minHeight='250px' spacing={8}>
          <Grid item md={8}>
            {pageContext.frontmatter.shortDescription}
            <Box
              sx={{
                marginTop: 2
              }}
            >
              <MuiLink href={''} target='_blank'>
                <Button variant="contained" startIcon={<EventIcon />} disabled>
                  Add to Calendar
                </Button>
              </MuiLink>
            </Box>
          </Grid>
          <Grid item md={4}>
            {thumbnailImg && (
              <Box
                sx={{
                  width: '200px',
                  '& .gatsby-image-wrapper': {
                    borderRadius: '4px',
                  }
                }}
              >
                <GatsbyImage
                  image={thumbnailImg} 
                  alt="Test"
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Hero>
      <PageContainer maxWidth={containerWidth} className="styled-markdown">
        <Typography variant="h5" component="h2" fontWeight="bold">
          Event Details
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1}>
            <EventIcon />  
            <Typography fontWeight="bold">
              When:
            </Typography>
            <Typography>
              {pageContext.frontmatter.date}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <PlaceIcon />  
            <Typography fontWeight="bold">
              Where:
            </Typography>
            <Typography>
              {pageContext.frontmatter.location}
            </Typography>
          </Stack>
          {pageContext.frontmatter.virtualEventLink && (
            <Stack direction="row" spacing={1}>
              <VideocamIcon />  
              <Typography fontWeight="bold">
                Attend Online:
              </Typography>
              <MuiLink href={pageContext.frontmatter.virtualEventLink}>
                {pageContext.frontmatter.virtualEventLink}
              </MuiLink>
            </Stack>
          )}
        </Stack>
        <Typography variant="h5" component="h2" fontWeight="bold">
          About this Event
        </Typography>
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

export default EventLayout;