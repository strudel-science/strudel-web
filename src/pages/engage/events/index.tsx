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

interface DataProps {
  allMdx: {
    nodes: {
      id: string;
      excerpt: string;
      frontmatter: any
    }[]
  }
}

const EventsPage: React.FC<PageProps<DataProps>> = ({ data }) => {
  const upcomingEvents = data.allMdx.nodes.filter(d => d.frontmatter.upcoming === true);
  const pastEvents = data.allMdx.nodes.filter(d => !d.frontmatter.upcoming);
  console.log(upcomingEvents);
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
                  <Box>
                    <Typography variant="h6">
                      {event.frontmatter.title}
                    </Typography>
                    <Stack 
                      sx={{
                      direction: 'row',
                      spacing: 1,
                      }}
                    >
                      <EventIcon />  {event.frontmatter.date}
                    </Stack>

                    {event.frontmatter.shortDescription}

                  </Box>
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
                  <ResponsiveImageWrapper>
                    ![Intro to UX image](../../../content/images/news-and-events/intro-to-ux.png)
                  </ResponsiveImageWrapper>
                </Box>
              </Grid>
            </Grid>
          </ContentCard>
        ))}
      </Hero>
      <PageContainer>
        <Typography variant="h5" component="h2" fontWeight="bold">
          Past Events
        </Typography>
        <ContentStepper>
          {pastEvents.map((event) => (
            <ContentStep key={event.frontmatter.slug}>
              <StepLabel>
                {event.frontmatter.title}
              </StepLabel>
              <StepContent>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1}>
                    <EventIcon fontSize="small" sx={{ color: 'error.main' }} />
                    <Typography variant="body2">{event.frontmatter.date}</Typography>
                  </Stack>
                  <Box>{event.frontmatter.shortDescription}</Box>
                </Stack>
              </StepContent>
            </ContentStep>
          ))}
        </ContentStepper>
      </PageContainer>
    </BaseLayout>
  );
};

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
          format
          location
          virtualEventLink
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