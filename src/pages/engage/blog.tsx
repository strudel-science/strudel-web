import * as React from "react"
import { Link, PageProps } from "gatsby"
import Seo from "../../components/Seo"
import BaseLayout from "../../components/layouts/BaseLayout"
import { Button, Grid, Stack, Typography } from "@mui/material"
import { PageContainer } from "../../components/PageContainer"
import { PageHeader } from "../../components/PageHeader"
import MediumFeed from "../../components/MediumFeed"


const BlogPage: React.FC<PageProps> = () => {
    return (
        <BaseLayout hasSidebar>
        <PageHeader>
          <Stack spacing={2}>
            <Typography 
              component="h1"
              variant="h3" 
              fontWeight="bold"
            >
              Blog
            </Typography>
            <Typography 
            variant="h6" 
            fontWeight="normal"
          >
            Articles and stories from STRUDEL
          </Typography>
          </Stack>
        </PageHeader>
        <MediumFeed />
      </BaseLayout>
    );
  };

export const Head = () => <Seo title="Blog" />

export default BlogPage