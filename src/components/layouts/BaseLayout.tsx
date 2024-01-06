import * as React from 'react';
import { Box, Breadcrumbs, Stack, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { Sidebar } from '../Sidebar';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { HeadProps, Link } from 'gatsby';
import Seo from '../Seo';

interface BaseLayoutProps extends React.PropsWithChildren {
  hasSidebar?: boolean;
  hasBreadcrumbs?: boolean;
}

/**
 * Base layout that wraps around all page layouts.
 * Automatically includes the navbar and optionally includes the 
 * sidebar and breadcrumbs.
 */
const BaseLayout: React.FC<BaseLayoutProps> = ({
  hasSidebar,
  hasBreadcrumbs = true,
  children
}) => {
  const breadcrumbs = useBreadcrumbs();
  console.log(breadcrumbs);
  return (
    <Box
      id="base-layout"
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Navbar />
      <Stack
        direction="row"
        sx={{
          height: '100%'
        }}
      >
        {hasSidebar && (
          <Sidebar />
        )}
        <Box
          sx={{
            flex: 1,
            height: '100%',
            width: '100%',
            paddingTop: '3rem'
          }}
        >
          {hasBreadcrumbs && (
            <Breadcrumbs 
              aria-label="breadcrumb"
              sx={{
                alignItems: 'center',
                padding: 2,
              }}
            >
              {breadcrumbs.map((breadcrumb, i) => {
                if (i === breadcrumbs.length - 1) {
                  return (
                    <Typography key={`${breadcrumb.label}-${i}`} color="text.primary">{breadcrumb.label}</Typography>
                  )
                } else {
                  return (
                    <Link 
                      key={`${breadcrumb.label}-${i}`}
                      to={breadcrumb.path || '#'}
                    >
                      {breadcrumb.path === '/' && (
                        <Box
                          sx={{
                            alignItems: 'baseline',
                            display: 'flex',
                          }}
                        >
                          <HomeIcon />
                        </Box>
                      )}
                      {breadcrumb.path !== '/' && (
                        breadcrumb.label
                      )}
                    </Link>
                  )
                }
              })}
            </Breadcrumbs>
          )}
          <Box
            component="main"
          >
            {children}
          </Box>
          <Footer containerWidth={hasSidebar ? 'md' : 'lg'} />
        </Box>
      </Stack>
    </Box>
  )
};

export const Head:React.FC<HeadProps<any, any>> = ({ pageContext }) => {
  return (
    <Seo title={pageContext.frontmatter.title} />
  );
}

export default BaseLayout;