import * as React from 'react';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import DrawIcon from '@mui/icons-material/Draw';
import BaseLayout from './BaseLayout';
import { PageProps } from 'gatsby';
import { PageHeader } from '../PageHeader';
import { Hero } from '../Hero';
import { Button } from 'gatsby-theme-material-ui';
import { StyledMarkdown } from '../StyledMarkdown';

const TaskFlowDetailsLayout: React.FC<PageProps<any, any>> = ({ pageContext, children }) => {
  return (
    <BaseLayout hasSidebar>
      <PageHeader>
        <Stack spacing={2}>
          <Typography 
            component="h1"
            variant="h4" 
            fontWeight="bold"
          >
            {pageContext.frontmatter.title}
          </Typography>
          <Typography 
            variant="h6" 
            fontWeight="normal"
          >
            {pageContext.frontmatter.subtitle}
          </Typography>
        </Stack>
      </PageHeader>
      <Hero>
        <Stack spacing={2}>
          <Typography 
            component="h2"
            variant="h5" 
            fontWeight="bold"
          >
            Task Flow Intent
          </Typography>
          <Typography>
            {pageContext.frontmatter.intent}
          </Typography>
          <Stack direction="row" justifyContent="center">
            <Grid container spacing={2} width="75%">
              <Grid item md={4}>
                <Button variant="contained" fullWidth startIcon={<VisibilityIcon />}>
                  Live Example
                </Button>
              </Grid>
              <Grid item md={4}>
                <Button variant="contained" fullWidth startIcon={<CodeIcon />}>
                  Code
                </Button>
              </Grid>
              <Grid item md={4}>
                <Button variant="contained" fullWidth startIcon={<DrawIcon />}>
                  Figma
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Hero>
      <Container 
        component="article" 
        maxWidth="md"
        sx={{
          paddingBottom: 4,
          paddingTop: 4,
        }}
      >
        <StyledMarkdown>
          {children}  
        </StyledMarkdown>
      </Container>
    </BaseLayout>
  )
};

export default TaskFlowDetailsLayout;