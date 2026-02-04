import * as React from 'react';
import { Box, Grid, Stack, Typography, Link as MuiLink } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import VideocamIcon from '@mui/icons-material/Videocam';
import CircleIcon from '@mui/icons-material/Circle';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import BaseLayout from './BaseLayout';
import { PageHeader } from '../PageHeader';
import { HeadProps, PageProps } from 'gatsby';
import { Button } from 'gatsby-theme-material-ui';
import { StyledMarkdown } from '../StyledMarkdown';
import Seo from '../Seo';
import { PageContainer } from '../PageContainer';
import { Hero } from '../Hero';
import { arrayToSentence, getImageFromFileNode } from '../../utils/utils';
import { GatsbyImage } from 'gatsby-plugin-image';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { ResponsiveImageWrapper } from '../ResponsiveImageWrapper';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

/**
 * Layout for Event pages.
 * Event frontmatter data is plugged into this template.
 * Main markdown content is rendered underneath the "About this Event" heading.
 * Event pages are generated dynamically based on the event files in /content/engage/events
 */
const EventLayout: React.FC<PageProps<any, any>> = ({ pageContext, children }) => {
  const thumbnailImg = getImageFromFileNode(pageContext.frontmatter.image);
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
            <span>{dayjs(pageContext.frontmatter.date).tz(pageContext.frontmatter.timezone || undefined).format('MMMM D, YYYY h:mm A z')}</span>
            <CircleIcon sx={{ fontSize: '0.75rem' }} />
            <span>{pageContext.frontmatter.format}</span>
          </Stack>
        </Stack>
      </PageHeader>
      <Hero containerWidth={containerWidth}>
        <Grid container minHeight='250px' spacing={8}>
          <Grid item md={8}>
            {pageContext.frontmatter.shortDescription}
            
            {pageContext.frontmatter.registrationCode && (
                <div>
                  <br/>
                  Registration code: {pageContext.frontmatter.registrationCode}
                  <br/>
                </div>
              )}
            <Box
              sx={{
                marginTop: 2
              }}
            >
              {pageContext.frontmatter.registrationLink && (
                <MuiLink href={pageContext.frontmatter.registrationLink} target='_blank'>
                  <Button variant="contained" startIcon={<AssignmentIndIcon />}>
                    Register for this event
                  </Button>
                </MuiLink>
              )}
              {!pageContext.frontmatter.registrationLink && pageContext.frontmatter.upcoming && (
                <Button variant="contained" startIcon={<AssignmentIndIcon />} disabled>
                  Registration is closed
                </Button>
              )}
            </Box>
          </Grid>
          <Grid item md={4}>
            {thumbnailImg && (
              <ResponsiveImageWrapper
                sx={{
                  '& .gatsby-image-wrapper': {
                    borderRadius: '4px',
                  }
                }}
              >
                <GatsbyImage
                  image={thumbnailImg}
                  alt={`Thumbnail banner for ${pageContext.frontmatter.title}`}
                />
              </ResponsiveImageWrapper>
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
              {dayjs(pageContext.frontmatter.date).tz(pageContext.frontmatter.timezone || undefined).format('MMMM D, YYYY H:mm A z')}
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
          {pageContext.frontmatter.registrationLink && (
            <Stack direction="row" spacing={1}>
              <AssignmentIndIcon />  
              <Typography fontWeight="bold">
                Register:
              </Typography>
              <MuiLink href={pageContext.frontmatter.registrationLink } target='_blank'>
                {pageContext.frontmatter.registrationLink}
              </MuiLink>
            </Stack>
            
          )}
          {pageContext.frontmatter.registrationCode && (
            <Stack direction="row" spacing={1}>
                <AssignmentTurnedInIcon />  
                <Typography fontWeight="bold">
                  Registration Code:
                </Typography>
                <div>
                  {pageContext.frontmatter.registrationCode}
                </div>
            </Stack>
              )}
          <Stack direction="row" spacing={1}>
            <PersonIcon />  
            <Typography fontWeight="bold">
              {pageContext.frontmatter.speakers.length === 1 ? 'Presenter:' : 'Presenters:'}
            </Typography>
            <Typography>
              {arrayToSentence(pageContext.frontmatter.speakers)}
            </Typography>
          </Stack>
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