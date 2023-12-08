import * as React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { useLocation, useMatch } from '@gatsbyjs/reach-router';
import { NavigationActionType, NavigationState, useNavigation } from '../context/NavigationProvider';
import { useEffect } from 'react';
import { findPageByPath, flattenPages } from '../utils/utils';
import { StrudelPage } from '../types/strudel-config';

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
 * The architecture and link metadata are pulled from strudel-config.json.
 */
export const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const navigation = useNavigation();
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
   * currentPath is the full page path without the pathPrefix or trailing slashes.
   * The pathPrefix only matters when the option is set in the config and 
   * the app is deployed under another path (e.g. '/strudel-web').
   */
  let currentPath = removeTrailingSlash(pathname);
  let sidebarRootPath: string | null = null;
  if (pathPrefix && `/${pathSegments[0]}` === pathPrefix) {
    currentPath = pathSegments.filter((d, i) => i > 0).join('/');
    currentPath = `/${currentPath}`;
    sidebarRootPath = `/${pathSegments[1]}`;
  } else {
    sidebarRootPath = `/${pathSegments[0]}`;
  }
  const sidebarRootPage = pages.find((page) => page.path === sidebarRootPath);

  /**
   * If the current page is within a collapsible section,
   * make sure its section is open on load.
   */
  useEffect(() => {
    const currentPage = findPageByPath(currentPath, pages);
    if (currentPage?.parent?.parent) {
      navigation.dispatch({
        type: NavigationActionType.EXPAND_SIDEBAR_SECTION,
        payload: currentPage.parent.path
      });
    }
  }, []);

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
          color: 'secondary.main',
        }}
      >
        <List>
          {sidebarRootPage && (
            <ListItem
              sx={{
                padding: 0,
              }}
            >
              <Typography
                sx={{
                  padding: '0.5rem 1rem',
                  color: 'neutral.main',
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                }}
              >
                {sidebarRootPage.name}
              </Typography>
            </ListItem>
          )}
          {sidebarRootPage && sidebarRootPage.children?.map((page, i) => (
            <ListItem 
              key={`${page.name} ${i}`}
              component="li"
              sx={{
                padding: 0,
              }}
            >
              {!page.children && (
                <Box
                  sx={{
                    ...getSideBarItemStyles(page, currentPath),
                  }}
                >
                  <Link
                    to={page.path}
                    style={{
                      display: 'block',
                      padding: '0.5rem 1rem',
                      width: '100%'
                    }}
                  >
                    {page.name}
                  </Link>
                </Box>
              )}
              {page.children && (
                <Accordion
                  expanded={isExpanded(page, navigation.state.sidebarExpandedSections)}
                  disableGutters
                  onChange={(e, expanded) => {
                    const actionType = expanded ? NavigationActionType.EXPAND_SIDEBAR_SECTION : NavigationActionType.COLLAPSE_SIDEBAR_SECTION;
                    navigation.dispatch({
                      type: actionType,
                      payload: page.path
                    });
                  }}
                  sx={{
                    background: 'none',
                    borderRadius: 0,
                    boxShadow: 'none',
                    color: 'secondary.main',
                    width: '100%',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      ...getSideBarItemStyles(page, currentPath),
                      height: '40px',
                      minHeight: '40px',
                      '& .MuiAccordionSummary-content': {
                        margin: '0.5rem 0',
                      },
                      '& .MuiAccordionSummary-expandIconWrapper': {
                        color: 'white',
                        transform: 'rotate(270deg)',
                      },
                      '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                        transform: 'rotate(360deg)',
                      },
                    }}
                  >
                    <Typography>{page.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      padding: '0.5rem 1rem'
                    }}
                  >
                    {page.children?.map((subPage, i) => (
                      <Box
                        key={`${subPage.name} ${i}`}
                        sx={{
                          ...getSideBarItemStyles(subPage, currentPath),
                          borderRadius: '4px',
                        }}
                      >
                        <Link
                          to={subPage.path}
                          style={{
                            display: 'block',
                            padding: '0.5rem 1rem',
                            width: '100%'
                          }}
                        >
                          {subPage.name}
                        </Link>
                      </Box>
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
  return str.replace(/\/$/, '');
};

const getSideBarItemStyles = (page: StrudelPage, currentPath: string) => {
  return {
    backgroundColor: page.path === currentPath ? 'secondary.main' : 'inherit',
    color: page.path === currentPath ? 'info.main' : 'inherit',
    fontWeight: page.path === currentPath ? 'bold' : 'normal',
    transition: '0.25s',
    width: '100%',
    '&:hover': {
      backgroundColor: page.path === currentPath ? 'secondary.light' : 'info.light',
      color: page.path === currentPath ? '#000000' : 'secondary.main',
    }
  }
};

const isExpanded = (
  page: StrudelPage, 
  sidebarExpandedSections: NavigationState['sidebarExpandedSections']
) => {
  return sidebarExpandedSections.indexOf(page.path) > -1;
};
