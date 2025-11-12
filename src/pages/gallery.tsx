import { Link, PageProps, graphql, navigate } from 'gatsby';
import React, { useEffect } from 'react';
import Seo from '../components/Seo';
import { Box, Chip, Grid, Stack, Link as MuiLink, Typography } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PageHeader } from '../components/PageHeader';
import BaseLayout from '../components/layouts/BaseLayout';
import { ContentCard } from '../components/ContentCard';
import { ResponsiveImageWrapper } from '../components/ResponsiveImageWrapper';
import { Button } from 'gatsby-theme-material-ui';
import { PageContainer } from '../components/PageContainer';
import { GalleryFrontmatter } from '../types/strudel-config';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { getImageFromFileNode } from '../utils/utils';
import { GatsbyImage } from 'gatsby-plugin-image';
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

interface DataProps {
  allMdx: {
    nodes: {
      id: string;
      excerpt: string;
      frontmatter: GalleryFrontmatter;
    }[]
  }
}

/**
 * Page to display upcoming and past events.
 * Events are pulled from the /content/engage/events folder.
 * Each markdown file in this folder is considered an event and includes 
 * metadata and details about the event.
 */
const GalleryPage: React.FC<PageProps<DataProps>> = ({ data }) => {
  console.log(data);
  const allItems = data.allMdx.nodes.map(d => {
    if (d.frontmatter.primaryImage) {
      d.frontmatter.primaryImageData = getImageFromFileNode(d.frontmatter.primaryImage);
    }
    return d;
  });

  return (
    <BaseLayout>
      <PageHeader>
        <Stack spacing={2}>
          <Typography 
            component="h1"
            variant="h3" 
            fontWeight="bold"
          >
            Gallery
          </Typography>
          <Typography 
            variant="h6" 
            fontWeight="normal"
          >
            Explore from examples of apps built using STRUDEL
          </Typography>
        </Stack>
      </PageHeader>
      <PageContainer>
        <Stack>
          {allItems.map((node) => (
            <ContentCard key={node.id} variant="outlined" sx={{ padding: 0 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                  <Stack spacing={2} sx={{ padding: 3 }}>
                    <Typography 
                      component="h2"
                      variant="h6"
                    >
                      {node.frontmatter.title}
                    </Typography>
                    <Typography>
                      Contributed by {node.frontmatter.contributors.join(', ')}
                    </Typography>
                    <Stack direction="row">
                      <Chip label={node.frontmatter.appType} />
                    </Stack>
                    <Typography>
                      {node.excerpt}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Link to={`/gallery/${node.frontmatter.slug}`} target="_blank">
                          <Button 
                            variant="contained"
                            color="primary"
                            endIcon={<ArrowForwardIcon />}
                          >
                            View Details
                          </Button>
                        </Link>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={5} sx={{ minHeight: '250px'}}>
                  {/* <PhotoProvider>
                    <PhotoView src={node.frontmatter.primaryImageData!.images.fallback.src}>
                      <img src={node.frontmatter.primaryImageData!.images.fallback.src} alt="" />
                    </PhotoView>
                  </PhotoProvider> */}
                  <ResponsiveImageWrapper sx={{ display: 'flex', verticalAlign: 'middle' }}>
                    <GatsbyImage 
                      image={node.frontmatter.primaryImageData!} 
                      alt={node.frontmatter.title}
                      style={{ borderRadius: '0 1rem 1rem 0' }}
                    />
                  </ResponsiveImageWrapper>
                </Grid>
              </Grid>
            </ContentCard>
            
          ))}
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
    allMdx(filter: {fields: {source: {eq: "gallery"}}}) {
      nodes {
        fields {
          source
        }
        frontmatter {
          title
          slug
          contributors
          appType
          repoUrl
          liveUrl
          primaryImage {
            childImageSharp {
              gatsbyImageData(width: 1600)
            }
          }
        }
        excerpt
      }
    }
  }
`;

export const Head = () => <Seo title="Gallery" />

export default GalleryPage