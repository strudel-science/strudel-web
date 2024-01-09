import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { AppBar, Box, Toolbar } from '@mui/material';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { StrudelPage } from '../types/strudel-config';
import { useLocation } from '@gatsbyjs/reach-router';
import { getCurrentPath } from '../utils/utils';

interface PagesResult {
  configJson: {
    pages: StrudelPage[]
  },
  site: {
    pathPrefix?: string;
  }
}

/**
 * Top navbar component that displays top-level page links from strudel-config.json.
 */
export const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const result = useStaticQuery<PagesResult>(graphql`
    query {
      configJson {
        pages {
          name
          path
          redirectTo
        }
      }
      site {
        pathPrefix
      }
    }
  `);
  const pages = result.configJson.pages;
  const pathPrefix = result.site.pathPrefix;
  const currentPath = getCurrentPath(pathname, pathPrefix);

  return (
    <Box 
      sx={{ 
        flexGrow: 1,
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 500,
      }}
    >
      <AppBar 
        position="static"
        sx={{
          backgroundColor: 'info.main',
          borderBottom: '1px solid',
          borderBottomColor: 'neutral.main',
        }}
      >
        <Toolbar 
          variant="dense" 
          sx={{ 
            height: '3rem',
            paddingLeft: 0,
          }}
        >
          <Link to="/">
            <StaticImage
              alt="STRUDEL header logo"
              loading="eager"
              placeholder="none"
              src="../../content/images/strudel-logo-icon.png"
            />
          </Link>
          {pages.map((page, i) => (
            <Box
              key={`${page.name} ${i}`}
              component="span"
              sx={{
                alignItems: 'center',
                display: 'flex',
                fontWeight: 'normal',
                height: '100%',
                position: 'relative',
                transition: '0.25s',
                '&:hover': {
                  backgroundColor: 'info.light',
                }
              }}
            >
              <Link to={page.redirectTo || page.path} style={{ padding: '0.5rem' }}> 
                {page.name}
              </Link>
              {page.path !== '/' && currentPath.indexOf(page.path) > -1 && (
                <Box
                  sx={{
                    backgroundColor: 'error.main',
                    bottom: 0,
                    height: '4px',
                    left: 0,
                    position: 'absolute',
                    width: '100%',
                  }}
                />
              )}
            </Box>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};