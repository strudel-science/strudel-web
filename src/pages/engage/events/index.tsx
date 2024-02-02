import { PageProps, graphql, navigate } from 'gatsby';
import React, { useEffect } from 'react';
import Seo from '../../../components/Seo';
import { Box, Grid, Stack, StepContent, StepLabel, Typography } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PageHeader } from '../../../components/PageHeader';
import BaseLayout from '../../../components/layouts/BaseLayout';
import { Hero } from '../../../components/Hero';
import { ContentCard } from '../../../components/ContentCard';
import { ResponsiveImageWrapper } from '../../../components/ResponsiveImageWrapper';
import { Button } from 'gatsby-theme-material-ui';
import { PageContainer } from '../../../components/PageContainer';
import { ContentStepper, ContentStep } from '../../../components/ContentStepper';
import { GatsbyImage } from 'gatsby-plugin-image';
import { arrayToSentence, getImageFromFileNode } from '../../../utils/utils';
import { EventFrontmatter } from '../../../types/strudel-config';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

interface DataProps {
  allMdx: {
    nodes: {
      id: string;
      excerpt: string;
      frontmatter: EventFrontmatter;
    }[]
  }
}

/**
 * Page to display upcoming and past events.
 * Events are pulled from the /content/engage/events folder.
 * Each markdown file in this folder is considered an event and includes 
 * metadata and details about the event.
 */
const EventsPage: React.FC<PageProps<DataProps>> = ({ data }) => {
  const upcomingEvents = data.allMdx.nodes.filter(d => {
    if (d.frontmatter.upcoming === true) {
      d.frontmatter.imageData = getImageFromFileNode(d.frontmatter.image);
      return d;
    }
  });
  const pastEvents = data.allMdx.nodes.filter(d => !d.frontmatter.upcoming);

  /** Sort upcoming events so that soonest events are first */
  upcomingEvents.sort((a, b) => {
    return dayjs(a.frontmatter.date).isAfter(dayjs(b.frontmatter.date)) ? 1 : -1
  });

  /** Sort past events so that most recent events are first */
  pastEvents.sort((a, b) => {
    return dayjs(a.frontmatter.date).isAfter(dayjs(b.frontmatter.date)) ? -1 : 1
  });

  console.log(upcomingEvents)
  return (
    <BaseLayout hasSidebar>
      <PageHeader>
        <Stack spacing={2}>
          <Typography 
            component="h1"
            variant="h3" 
            fontWeight="bold"
          >
            Events
          </Typography>
          <Typography 
            variant="h6" 
            fontWeight="normal"
          >
            Webinars, workshops, and other events related to STRUDEL
          </Typography>
        </Stack>
      </PageHeader>
      <Hero>
        <Typography variant="h5" component="h2" fontWeight="bold">
          Upcoming Events
        </Typography>
        {upcomingEvents.map((event) => (
          <ContentCard 
            key={event.frontmatter.slug}
            variant="outlined" 
            sx={{ 
              marginTop: '32px',
              padding: 0 ,
            }}
          >
            <Grid container sx={{ minHeight: '250px' }}>
              <Grid item md={8}>
                <Stack
                  sx={{
                    minHeight: '250px',
                    justifyContent: 'space-between',
                    height: '100%',
                    padding: 3,
                  }}
                >
                  <Stack spacing={2}>
                    <Box>
                      <Box>
                        <Typography variant="h6" sx={{ marginBottom: '0 !important' }}>{event.frontmatter.title}</Typography>
                        <Typography>{arrayToSentence(event.frontmatter.speakers)}</Typography>
                      </Box>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <EventIcon /> 
                      <Typography>{dayjs(event.frontmatter.date).format('MMMM D, YYYY H:mm A z')}</Typography>
                    </Stack>
                    <Typography
                      sx={{
                        display: '-webkit-box',
                        '-webkit-line-clamp': '2',
                        '-webkit-box-orient': 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {event.frontmatter.shortDescription}
                    </Typography>
                    <Box>
                      <Button 
                        to={`/engage/events/${event.frontmatter.slug}`}
                        size="large"
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        sx={{ color: '#ffffff !important' }}
                      >
                        Learn more
                      </Button>
                    </Box>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item md={4} sx={{ minHeight: '250px' }}>
                <Box
                  sx={{
                    backgroundColor: 'neutral.main',
                    borderRadius: '0 10px 10px 0',
                    height: '100%',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                  }}
                >
                  {event.frontmatter.imageData && (
                    <ResponsiveImageWrapper>
                      <GatsbyImage
                        image={event.frontmatter.imageData} 
                        alt="Test"
                        style={{
                          height: '100%',
                        }}
                      />
                    </ResponsiveImageWrapper>
                  )}
                </Box>
              </Grid>
            </Grid>
          </ContentCard>
        ))}
        {upcomingEvents.length === 0 && (
          <Stack spacing={1}>
            <Box>There are no upcoming events scheduled. Check back soon for updates!</Box>
            <Box>Want to collaborate on a webinar? Reach out to strudel@lbl.gov</Box>
          </Stack>
        )}
      </Hero>
      <PageContainer>
        <Typography variant="h5" component="h2" fontWeight="bold">
          Past Events
        </Typography>
        <ContentStepper numbered={false}>
          {pastEvents.map((event) => (
            <ContentStep key={event.frontmatter.slug}>
              <StepLabel>
                {event.frontmatter.title}
              </StepLabel>
              <StepContent>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1}>
                    <EventIcon fontSize="small" sx={{ color: 'error.main' }} />
                    <Typography variant="body2">{dayjs(event.frontmatter.date).format('MMMM D, YYYY')}</Typography>
                  </Stack>
                  <Box>{event.frontmatter.shortDescription}</Box>
                  <Box>
                    <Button 
                      to={`/engage/events/${event.frontmatter.slug}`}
                      size="small"
                      endIcon={<ArrowForwardIcon />}
                    >
                      More details
                    </Button>
                  </Box>
                </Stack>
              </StepContent>
            </ContentStep>
          ))}
        </ContentStepper>
        {pastEvents.length === 0 && (
          <Typography>No past events to show</Typography>
        )}
      </PageContainer>
    </BaseLayout>
  );
};

/**
 * Query for event mdx nodes from the "events" source.
 * Everything in the /content/engage/events folder is part of the "events" source.
 */
export const query = graphql`
  query {
    allMdx(filter: {fields: {source: {eq: "events"}}}) {
      nodes {
        fields {
          source
        }
        frontmatter {
          title
          slug
          date
          upcoming
          speakers
          format
          location
          registrationLink
          shortDescription
          image {
            childImageSharp {
              gatsbyImageData(width: 800)
            }
          }
        }
      }
    }
  }
`;

export const Head = () => <Seo title="Events" />

export default EventsPage