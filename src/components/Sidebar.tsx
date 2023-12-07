import * as React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { useLocation, useMatch } from '@gatsbyjs/reach-router';
import { StrudelPage } from '../../gatsby-node';

interface PagesResult {
  configJson: {
    pages: StrudelPage[]
  },
  site: {
    pathPrefix?: string
  }
}

/**
 * Sidebar component that dynamically displays page links based on the current 
 * page and its position in the navigational architecture.
 * The architecture and link metadata is pulled from strudel-config.json.
 */
export const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const match = useMatch('/task-flows/');
  console.log(match);
  const result = useStaticQuery<PagesResult>(graphql`
    query {
      configJson {
        pages {
          markdownId
          name
          path
          layoutComponent
          children {
            markdownId
            name
            path
            layoutComponent
            children {
              markdownId
              name
              path
              layoutComponent
            }
          }
        }
      }
      site {
        pathPrefix
      }
    }
  `);
  const pages = result.configJson.pages;
  const pathPrefix = result.site.pathPrefix;

  /**
   * Split pathname by slash and remove empty strings
   */
  const pathSegments = pathname.split('/').filter((d: string) => d);
  /**
   * appPath is the full page path without the pathPrefix or trailing slashes.
   * The pathPrefix only matters when the option is set in the config and 
   * the app is deployed under another path (e.g. '/strudel-web').
   * The regex below removes the trailing slash from the path if present.
   */
  let appPath = pathname.replace(/\/$/, "");
  let sidebarRootPath: string | null = null;
  if (pathPrefix && `/${pathSegments[0]}` === pathPrefix) {
    appPath = pathSegments.filter((d, i) => i > 0).join('/');
    appPath = `/${appPath}`;
    sidebarRootPath = `/${pathSegments[1]}`;
  } else {
    sidebarRootPath = `/${pathSegments[0]}`;
  }
  const sidebarRootPage = pages.find((page) => page.path === sidebarRootPath);

  return (
    <Box
      component="aside"
      sx={{ 
        position: 'relative', 
        width: '250px' 
      }}
    >
      <Box
        component="nav"
        sx={{ 
          backgroundColor: 'info.main', 
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
          paddingTop: '3rem',
          width: '250px',
          height: '100%',
          borderRight: '1px solid',
          borderRightColor: 'neutral.main',
          color: '#ffffff',
        }}
      >
        <List>
          {sidebarRootPage && (
            <ListItem
              sx={{
                color: 'neutral.main',
                fontSize: '1.125rem',
                fontWeight: 'bold',
                padding: 0,
              }}
            >
              <Link 
                to={sidebarRootPage.path}
                style={{
                  padding: '0.5rem 1rem',
                  width: '100%'
                }}
              >
                {sidebarRootPage.name}
              </Link>
            </ListItem>
          )}
          {sidebarRootPage && sidebarRootPage.children?.map((page, i) => (
            <ListItem 
              key={`${page.name} ${i}`}
              component="li"
              sx={{
                backgroundColor: page.path === appPath ? 'secondary.main' : 'inherit',
                color: page.path === appPath ? '#000000' : 'inherit',
                padding: 0,
                transition: '0.25s',
                '&:hover': {
                  color: page.path === appPath ? '#000000' : 'secondary.main',
                }
              }}
            >
              {!page.children && (
                <Link
                  to={page.path}
                  style={{
                    padding: '0.5rem 1rem',
                    width: '100%'
                  }}
                >
                  {page.name}
                </Link>
              )}
              {page.children && (
                <Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      '& .MuiAccordionSummary-expandIconWrapper': {
                        transform: 'rotate(270deg)',
                      },
                      '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                        transform: 'rotate(360deg)',
                      },
                    }}
                  >
                    <Typography>{page.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {page.children?.map((subPage, i) => (
                      <p>{subPage.name}</p>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}
            </ListItem> 
          ))}
        </List>
      </Box>
    </Box>
  )
};

const removeTrailingSlash = (str: string) => {     
  return str.replace(/\/$/, "");
}