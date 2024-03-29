import * as React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, BoxProps, List, ListItem, Stack, Typography, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { useLocation, useMatch } from '@gatsbyjs/reach-router';
import { NavigationActionType, NavigationState, useNavigation } from '../context/NavigationProvider';
import { useEffect } from 'react';
import { findPageByPath, flattenPages, getCurrentPath, getTopLevelParent } from '../utils/utils';
import { StrudelPage } from '../types/strudel-config';
import { usePage } from '../hooks/usePage';

interface PagesResult {
  configJson: {
    pages: StrudelPage[]
  },
  site: {
    pathPrefix?: string
  }
}

interface SidebarProps extends BoxProps {
  rootPage?: StrudelPage;
  navProps?: BoxProps;
}

/**
 * Sidebar component that dynamically displays page links based on the current 
 * page and its position in the navigational architecture.
 * The architecture and link metadata are pulled from strudel-config.json.
 */
export const Sidebar: React.FC<SidebarProps> = ({ rootPage, navProps, sx, ...rest }) => {
  const navigation = useNavigation();
  const page = usePage();
  const result = useStaticQuery<PagesResult>(graphql`
    query {
      configJson {
        pages {
          name
          path
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
  const currentPath = page?.path;
  const topLevelParentPage = page && getTopLevelParent(page);
  const sidebarRootPage = rootPage || pages.find((page) => page.path === topLevelParentPage?.path);
    
  /**
   * If the current page is within a collapsible section,
   * make sure its section is open on load.
   */
  useEffect(() => {
    if (currentPath) {
      const currentPage = findPageByPath(currentPath, pages);
      if (currentPage?.parent?.parent) {
        navigation.dispatch({
          type: NavigationActionType.EXPAND_SIDEBAR_SECTION,
          payload: currentPage.parent.path
        });
      }
    }
  }, []);

  return (
    <Box
      component="aside"
      {...rest}
      sx={{
        height: '100%',
        position: 'relative', 
        width: '250px',
        zIndex: 100,
        ...sx
      }}
    >
      <Box
        component="nav"
        {...navProps}
        sx={{
          backgroundColor: 'info.main', 
          borderRight: '1px solid',
          borderRightColor: 'neutral.main',
          color: 'secondary.main',
          height: '100%',
          left: 0,
          paddingTop: '3rem',
          position: 'fixed',
          top: 0,
          width: '250px',
          ...navProps?.sx
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
                      ...getSideBarItemStyles(page, currentPath, true),
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

export const getSideBarItemStyles = (page: StrudelPage, currentPath?: string, isAccordionRoot?: boolean) => {
  return {
    backgroundColor: page.path === currentPath && !isAccordionRoot ? 'secondary.main' : 'inherit',
    color: page.path === currentPath && !isAccordionRoot ? 'info.main' : 'inherit',
    fontWeight: page.path === currentPath && !isAccordionRoot ? 'bold' : 'normal',
    transition: '0.25s',
    width: '100%',
    '&:hover': {
      backgroundColor: page.path === currentPath && !isAccordionRoot ? 'secondary.light' : 'info.light',
      color: page.path === currentPath && !isAccordionRoot ? '#000000' : 'secondary.main',
    }
  }
};

const isExpanded = (
  page: StrudelPage, 
  sidebarExpandedSections: NavigationState['sidebarExpandedSections']
) => {
  return sidebarExpandedSections.indexOf(page.path) > -1;
};
