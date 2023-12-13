import * as React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { HomeSection } from './HomeSection/HomeSection';
import { Button } from 'gatsby-theme-material-ui';
import { HomeSectionDescription } from './HomeSection/HomeSectionDescription';
import { HomeSectionTitle } from './HomeSection/HomeSectionTitle';
import { HomeSectionGrid } from './HomeSection/HomeSectionGrid';

export const About: React.FC = () => {
  return (
    <HomeSection variant="dark" borderPosition="left">
      <HomeSectionGrid
        leftContent={
          <>
            <HomeSectionTitle>
              About
            </HomeSectionTitle>
            <HomeSectionDescription>
              The STRUDEL project aims to ease the process of planning & designing scientific software from core requirements to UI development.
            </HomeSectionDescription>
            <Box>
              <Button variant="contained">
                Get Involved
              </Button>
            </Box>
          </>
        }
        rightContent={
          <Grid container columnSpacing={4}>
            <Grid item sm={6}>
              <InnerCardItem
                title="Planning Framework"
                description="A tool for categorizing key elements making up scientific software projects"
                link={
                  <Button 
                    to="/"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ color: '#ffffff' }}
                  >
                    Learn more
                  </Button>
                }
              />
            </Grid>
            <Grid item sm={6}>
              <InnerCardItem
                title="Design System"
                description="A tool to streamline scientific software UI design and development"
                link={
                  <Button 
                    to="/"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ color: '#ffffff' }}
                  >
                    Learn more
                  </Button>
                }
              />
            </Grid>
          </Grid>
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
        <Box>
          {link}
        </Box>
      </Stack>
    </Box>
  )
}