import * as React from 'react';
import { Grid, Link as MuiLink, Stack, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import DrawIcon from '@mui/icons-material/Draw';
import BaseLayout from './BaseLayout';
import { PageProps, Link } from 'gatsby';
import { PageHeader } from '../PageHeader';
import { Hero } from '../Hero';
import { Button } from 'gatsby-theme-material-ui';
import { StyledMarkdown } from '../StyledMarkdown';
import { usePage } from '../../hooks/usePage';
import { PageContainer } from '../PageContainer';

const TaskFlowDetailsLayout: React.FC<PageProps<any, any>> = ({ pageContext, children }) => {
  const page = usePage();
  console.log(page);
  return (
    <BaseLayout hasSidebar>
      <PageHeader>
        <Stack spacing={2}>
          <Typography 
            component="h1"
            variant="h3" 
            fontWeight="bold"
          >
            {pageContext.frontmatter.title}
          </Typography>
          <Typography 
            variant="h6" 
            fontWeight="normal"
          >
            {pageContext.frontmatter.tagline}
          </Typography>
        </Stack>
      </PageHeader>
      <Hero>
        <Stack spacing={2}>
          <Typography 
            component="h2"
            variant="h4" 
            fontWeight="bold"
          >
            Intent
          </Typography>
          <Typography>
            {pageContext.frontmatter.intent}
          </Typography>
          <Stack direction="row">
            <Grid container spacing={2} width="75%">
              <Grid item md={4}>
                <MuiLink href={pageContext.frontmatter.exampleUrl} target='_blank'>
                  <Button variant="contained" fullWidth startIcon={<VisibilityIcon />}>
                    Live Example
                  </Button>
                </MuiLink>
              </Grid>
              <Grid item md={4}>
                <MuiLink href={pageContext.frontmatter.codeUrl} target='_blank'>
                  <Button variant="contained" fullWidth startIcon={<CodeIcon />}>
                    Code
                  </Button>
                </MuiLink>
              </Grid>
              <Grid item md={4}>
                <MuiLink href={pageContext.frontmatter.figmaUrl} target='_blank'>
                  <Button variant="contained" fullWidth startIcon={<DrawIcon />}>
                    Design Templates
                  </Button>
                </MuiLink>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Hero>
      <PageContainer>
        <StyledMarkdown>
          {children}  
        </StyledMarkdown>
      </PageContainer>
    </BaseLayout>
  )
};

export default TaskFlowDetailsLayout;