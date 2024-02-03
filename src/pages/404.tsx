import * as React from "react"
import { Link, PageProps } from "gatsby"
import Seo from "../components/Seo"
import BaseLayout from "../components/layouts/BaseLayout"
import { Button, Grid, Stack, Typography } from "@mui/material"
import { PageContainer } from "../components/PageContainer"
import { PageHeader } from "../components/PageHeader"

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <BaseLayout hasBreadcrumbs={false}>
      <PageHeader>
        <Stack spacing={2}>
          <Typography 
            component="h1"
            variant="h3" 
            fontWeight="bold"
          >
            Page Not Found
          </Typography>
        </Stack>
      </PageHeader>
      <PageContainer>
        <Typography variant="h5" component="h2">
          There's no page at that URL. Try one of the links below.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Link to="/design-system/overview">
              <Button variant="outlined" size="large" sx={{ height: '100%', width: '100%' }}>
                Design System
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link to="/design-system/task-flows/overview">
              <Button variant="outlined" size="large" sx={{ height: '100%', width: '100%' }}>
                Task Flows
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link to="/planning-framework/overview">
              <Button variant="outlined" size="large" sx={{ height: '100%', width: '100%' }}>
                Planning Framework
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link to="/engage/events">
              <Button variant="outlined" size="large" sx={{ height: '100%', width: '100%' }}>
                Events
              </Button>
            </Link>
          </Grid>
        </Grid>
      
      </PageContainer>
    </BaseLayout>
  );
};

export default NotFoundPage

export const Head = () => <Seo title="Not Found" />