import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { PageContainer } from './PageContainer';
import { Grid, Stack, Typography } from '@mui/material';
import { ContentCard } from './ContentCard';
import { ResponsiveImageWrapper } from './ResponsiveImageWrapper';
import { GatsbyImage } from 'gatsby-plugin-image';
import { getImageFromFileNode } from '../utils/utils';
import { Link, navigate } from 'gatsby';

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
}

const MediumFeed: React.FC = () => {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMediumFeed = async () => {
      try {
        const rssFeedUrl = "https://medium.com/feed/strudel-science"; 
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Medium feed");
        }

        const data = await response.json();
        const formattedPosts = data.items.map((item: any) => ({
          title: item.title,
          link: item.link,
          pubDate: dayjs(item.pubDate.split('T')[0]).format('MMMM D, YYYY'), 
          thumbnail: extractThumbnail(item.content) || "../../content/images/news-and-events/default-image.png", // Fallback image
          description: item.description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 200) + "..."
        }));

        setPosts(formattedPosts);
      } catch (err: any) {
        setError(err.message);
      }
    };

    const extractThumbnail = (content: string): string | null => {
      const match = content.match(/<img.*?src="(.*?)"/);
      return match ? match[1] : null;
    };

    fetchMediumFeed();
  }, []);

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Unable to load Medium feed: {error}</p>;
  }

  return (
    <PageContainer>
        <Typography variant="h5" component="h2" fontWeight="bold">
          Latest from Medium
        </Typography>
    
        {posts.length === 0 ? (
            <p>Loading...</p>
        ) : (
        posts.map((post, index) => (
        <ContentCard
              key={index}
              variant="dot-outlined" 
              sx={{ 
                marginTop: '32px',
                padding: '15px' ,
                display: 'flex',
                gap: '15px'
              }}
            >
            <Grid container>
                <Grid item md={9}>
                    <Stack spacing={2}> 
                        <Typography variant="h6" sx={{ marginBottom: '0 !important' }}>
                            <Link to={post.link} target="_blank">
                                {post.title}
                            </Link>
                        </Typography>
                        <Typography>
                            {post.description}
                        </Typography>
                        <span>{post.pubDate}</span>
                    </Stack>
                </Grid>
                <Grid item md={3}>        
                  <img
                  src={post.thumbnail}
                  alt="Thumbnail"
                  style={{
                      width: '200px',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                  }}
                  />
                </Grid>
            </Grid>
          </ContentCard>
        ))
      )}
    </PageContainer>
  );
};

export default MediumFeed;