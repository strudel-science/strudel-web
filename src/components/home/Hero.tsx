import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Box, Stack, Typography } from '@mui/material';
import { HomeSection } from './HomeSection';

export const Hero: React.FC = () => {
  return (
    <HomeSection>
      <Stack spacing={4}>
        <Box
          sx={{
            textAlign: 'center'
          }}
        >
          <Box
            sx={{
              maxWidth: '700px',
              display: 'inline-block'
            }}
          >
            <StaticImage
              alt="STRUDEL header logo"
              loading="eager"
              placeholder="none"
              src="../../../content/images/strudel-logo-transp.png"
            />
          </Box>
        </Box>
        <Box
          sx={{
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h5" 
            component="h1"
            sx={{
              textAlign: 'center',
              maxWidth: '900px',
              display: 'inline-block'
            }}
          >
            STRUDEL enables teams to create user-centered software for scientific communities. Plan, Design, & Build better products using STRUDEL Planning Framework and Design System.
          </Typography>
        </Box>
      </Stack>
    </HomeSection>
  );
};