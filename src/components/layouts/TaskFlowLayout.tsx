import * as React from 'react';
import { Box, Chip, Grid, Link as MuiLink, Stack, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import DrawIcon from '@mui/icons-material/Draw';
import BaseLayout from './BaseLayout';
import { PageProps, Link, HeadProps } from 'gatsby';
import { PageHeader } from '../PageHeader';
import { Hero } from '../Hero';
import { Button } from 'gatsby-theme-material-ui';
import { StyledMarkdown } from '../StyledMarkdown';
import { PageContainer } from '../PageContainer';
import Seo from '../Seo';
import { TaskFlowFrontmatter } from '../../types/strudel-config';
import { getImageFromFileNode } from '../../utils/utils';
import { GatsbyImage } from 'gatsby-plugin-image';

interface TaskFlowPageContext {
  frontmatter: TaskFlowFrontmatter
}

/**
 * Layout for Task Flow pages.
 * Includes everything in the BaseLayout plus a sidebar, 
 * PageHeader section, Hero section, and a main content container.
 * Markdown content is rendered inside the main content container (PageContainer)
 * using the children prop.
 */
const TaskFlowLayout: React.FC<PageProps<any, TaskFlowPageContext>> = ({ pageContext, children }) => {
  const thumbnailImg = getImageFromFileNode(pageContext.frontmatter.iconImage);
  return (
    <BaseLayout hasSidebar>
      <PageHeader>
        <Stack direction="row" justifyContent="space-between">
          <Stack spacing={2}>
            <Typography 
              component="h1"
              variant="h3" 
              fontWeight="bold"
            >
              {pageContext.frontmatter.title}
            </Typography>
            <Stack direction="row" spacing={1}>
              {pageContext.frontmatter.tags?.map((tag, i) => (
                <Chip 
                  key={`${tag}-${i}`}
                  label={tag}
                  variant="outlined"
                  color="info"
                />
              ))}
            </Stack>
          </Stack>
          {thumbnailImg && (
            <Box
              sx={{
                width: '100px',
                '& .gatsby-image-wrapper': {
                  borderRadius: '50%',
                }
              }}
            >
              <GatsbyImage
                image={thumbnailImg} 
                alt="Test"
              />
            </Box>
          )}
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
          <p>
            {pageContext.frontmatter.intent}
         <br/>
            {pageContext.frontmatter.intentDetails}
          </p>
          <Box>
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
          </Box>
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

export const Head:React.FC<HeadProps<any, any>> = ({ pageContext }) => {
  return (
    <Seo title={pageContext.frontmatter.title} />
  );
}

export default TaskFlowLayout;