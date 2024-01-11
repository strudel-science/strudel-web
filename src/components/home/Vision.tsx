import * as React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { HomeSection } from './HomeSection/HomeSection';
import { Button } from 'gatsby-theme-material-ui';
import { HomeSectionDescription } from './HomeSection/HomeSectionDescription';
import { HomeSectionTitle } from './HomeSection/HomeSectionTitle';
import { HomeSectionGrid } from './HomeSection/HomeSectionGrid';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

export const Vision: React.FC = () => {
  return (
    <HomeSection variant="light" borderPosition="left">
      <HomeSectionGrid
        leftContent={
          <>
            <HomeSectionTitle>
              Our Vision
            </HomeSectionTitle>
            <HomeSectionDescription>
              STRUDEL is supporting scientific software development, and the growing science software UX community, through advocacy and the stewardship of key products. We aim to make adopting UX in science easier and more effective from project planning through product development.
            </HomeSectionDescription>
          </>
        }
        rightContent={
          <Box>
            <StaticImage
              alt="STRUDEL storyboard comic"
              placeholder="blurred"
              src="../../../content/images/strudel-storyboard.png"
            />
          </Box>
        }
      />            
    </HomeSection>
  );
};

interface InnerCardItemProps {
  title: string;
  description: string;
  link: React.ReactNode;
}

const InnerCardItem: React.FC<InnerCardItemProps> = ({
  title,
  description,
  link
}) => {
  return (
    <Box
      sx={{
        borderColor: 'primary.main',
        borderRadius: 4,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 3
      }}
    >
      <Stack spacing={2}>
        <Typography 
          variant="h4" 
          component="h3" 
          sx={{ fontWeight: 'bold'}}
        >
          {title}
        </Typography>
        <HomeSectionDescription>
          {description}
        </HomeSectionDescription>
        {link}
      </Stack>
    </Box>
  )
}