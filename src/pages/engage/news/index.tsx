import { Link, PageProps, graphql, navigate } from 'gatsby';
import React, { useEffect } from 'react';
import Seo from '../../../components/Seo';
import { Box, Grid, Stack, StepContent, StepLabel, Typography } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import CircleIcon from '@mui/icons-material/Circle';
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
import { EventFrontmatter, NewsFrontmatter } from '../../../types/strudel-config';
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
      frontmatter: NewsFrontmatter;
    }[]
  }
}

/**
 * Page to display all news items.
 * News items are pulled from the /content/engage/news folder.
 * Each markdown file in this folder is considered a news item and includes 
 * metadata and a longer news post.
 */
const NewsPage: React.FC<PageProps<DataProps>> = ({ data }) => {
  /** Sort news so that soonest events are first */
  data.allMdx.nodes.sort((a, b) => {
    return dayjs(a.frontmatter.date).isAfter(dayjs(b.frontmatter.date)) ? -1 : 1
  });

  const allNews = data.allMdx.nodes.map(d => {
    if (d.frontmatter.thumbnail) {
      d.frontmatter.thumbnailData = getImageFromFileNode(d.frontmatter.thumbnail);
    }
    return d;
  });

  const latestNewsItem = allNews.shift();

  return (
    <BaseLayout hasSidebar>
      <PageHeader>
        <Stack spacing={2}>
          <Typography 
            component="h1"
            variant="h3" 
            fontWeight="bold"
          >
            News
          </Typography>
          <Typography 
            variant="h6" 
            fontWeight="normal"
          >
            Know whats baking in STRUDEL project
          </Typography>
        </Stack>
      </PageHeader>
      <Hero>
        <Typography variant="h5" component="h2" fontWeight="bold">
          Latest
        </Typography>
        {latestNewsItem && (
          <ContentCard 
            key={latestNewsItem.frontmatter.slug}
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
                    <Typography 
                      variant="h5" 
                      sx={{
                        fontWeight: 'bold',
                        marginBottom: '0 !important',
                        '&.MuiTypography-root a': {
                          color: 'white'
                        }
                      }}
                    >
                      <Link to={`/engage/news/${latestNewsItem.frontmatter.slug}`}>
                        {latestNewsItem.frontmatter.title}
                      </Link>
                    </Typography>
                    <Typography>
                      {latestNewsItem.excerpt}
                    </Typography>
                    <Stack 
                      direction="row"
                      spacing={1}
                      sx={{
                        alignItems: 'center',
                      }}
                    >
                      <span>{dayjs(latestNewsItem.frontmatter.date).format('MMMM D, YYYY')}</span>
                      <CircleIcon sx={{ fontSize: '0.75rem' }} />
                      <Typography>{latestNewsItem.frontmatter.author}</Typography>
                    </Stack>
                    <Box>
                      <Button 
                        to={`/engage/news/${latestNewsItem.frontmatter.slug}`}
                        size="large"
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        sx={{ color: '#ffffff !important' }}
                      >
                        Read more
                      </Button>
                    </Box>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item md={4} sx={{ minHeight: '250px'}}>
                <Box
                  sx={{
                    // backgroundColor: 'neutral.main',
                    borderRadius: '0 10px 10px 0',
                    height: '100%',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                  }}
                >
                  {latestNewsItem.frontmatter.thumbnailData && (
                    <ResponsiveImageWrapper sx={{ display: 'flex', verticalAlign: 'middle' }}>
                      <GatsbyImage
                        image={latestNewsItem.frontmatter.thumbnailData} 
                        alt={`Thumbnail banner for ${latestNewsItem.frontmatter.title}`}
                      />
                    </ResponsiveImageWrapper>
                  )}
                </Box>
              </Grid>
            </Grid>
          </ContentCard>
        )}
      </Hero>
      <PageContainer>
        <Typography variant="h5" component="h2" fontWeight="bold">
          All News
        </Typography>
        <Stack spacing={2}>
          {allNews.map((newsItem) => (
            <ContentCard
              key={newsItem.frontmatter.slug}
              variant="dot-outlined" 
              sx={{ 
                marginTop: '32px',
                padding: 0 ,
              }}
            >
              <Grid container>
                <Grid item md={9}>
                  <Stack
                    sx={{
                      justifyContent: 'space-between',
                      height: '100%',
                      padding: 3,
                    }}
                  >
                    <Stack spacing={2}>
                      <Typography variant="h6" sx={{ marginBottom: '0 !important' }}>
                        <Link to={`/engage/news/${newsItem.frontmatter.slug}`}>
                          {newsItem.frontmatter.title}
                        </Link>
                      </Typography>
                      <Typography>
                        {newsItem.excerpt}
                      </Typography>
                      <Stack 
                        direction="row"
                        spacing={1}
                        sx={{
                          alignItems: 'center',
                        }}
                      >
                        <span>{dayjs(newsItem.frontmatter.date).format('MMMM D, YYYY')}</span>
                        <CircleIcon sx={{ fontSize: '0.75rem' }} />
                        <Typography>{newsItem.frontmatter.author}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item md={3} >
                  <Box
                    sx={{
                      // backgroundColor: 'neutral.main',
                      borderRadius: '0 10px 10px 0',
                      width: '100%',
                      overflow: 'hidden',
                      pointerEvents: 'none',
                    }}
                  >
                    {newsItem.frontmatter.thumbnailData && (
                      <ResponsiveImageWrapper sx={{ display: 'flex', verticalAlign: 'middle' }}>
                        <GatsbyImage
                          image={newsItem.frontmatter.thumbnailData} 
                          alt={`Thumbnail banner for ${newsItem.frontmatter.title}`}
                        />
                      </ResponsiveImageWrapper>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </ContentCard>
          ))}
          {!allNews || allNews.length === 0 && (
            <Typography>No other news at this time</Typography>
          )}
        </Stack>
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
    allMdx(filter: {fields: {source: {eq: "news"}}}) {
      nodes {
        fields {
          source
        }
        frontmatter {
          title
          slug
          date
          author
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 800)
            }
          }
        }
        excerpt
        internal {
          contentFilePath
        }
      }
    }
  }
`;

export const Head = () => <Seo title="News" />

export default NewsPage