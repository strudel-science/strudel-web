import React, { useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { AppBar, Box, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Popover, Toolbar } from '@mui/material';
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
          children {
            name
            path
            redirectTo
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
  const currentPath = getCurrentPath(pathname, pathPrefix);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openedItem, setOpenedItem] = useState('');
  
  const handleOpen = (e: React.MouseEvent<HTMLElement>, page: StrudelPage) => {
    setOpenedItem(page.name);
    if (anchorEl !== e.currentTarget) {
      setAnchorEl(e.currentTarget);
    }
  };

  /**
   * Close the nav item menu only if hovering over an element 
   * other than the popover menu itself.
   */
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget.id !== 'nav-popover') {
      setOpenedItem('');
      setAnchorEl(null);
    }
  };

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
              {!page.children && (
                <Link to={page.redirectTo || page.path} style={{ padding: '0.5rem' }}> 
                  {page.name}
                </Link>
              )}
              {page.children && (
                <Box
                  onMouseEnter={(e) => handleOpen(e, page)}
                  onMouseLeave={handleClose}
                >
                  <Link
                    id={`${page.name}-menu-button`}
                    to={page.redirectTo || page.path}
                    style={{ padding: '0.5rem', zIndex: 1301 }}
                    aria-controls={openedItem === page.name ? 'nav-popover' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openedItem === page.name ? 'true' : undefined}
                  >
                    {page.name}
                  </Link>
                  <Popover
                  transitionDuration={200}
                    sx={{
                      marginTop: 1.5,
                      pointerEvents: 'none',
                      '& .MuiPopover-paper': {
                        backgroundColor: 'info.main',
                        borderRadius: 0,
                        border: '1px solid #ccc',
                        borderTop: 'none',
                        color: 'secondary.main',
                        pointerEvents: 'all',
                      }
                    }}
                    open={openedItem === page.name}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    onClose={handleClose}
                    disableRestoreFocus
                  >
                    <Box 
                      id="nav-popover"
                      aria-labelledby={`${page.name}-menu-button`}
                    >
                      <List sx={{ padding: 0 }}>
                        {page.children.map((subpage, k) => (
                          <ListItem key={`${subpage.name} ${k}`} disablePadding>
                            <ListItemButton
                              sx={{ 
                                borderBottom: '1px solid',
                                borderBottomColor: 'info.light',
                                padding: 0,
                                '&:hover': {
                                  backgroundColor: 'info.light'
                                }
                              }}
                            >
                              <Link
                                to={subpage.redirectTo || subpage.path}
                                style={{
                                  minWidth: '200px',
                                  padding: '0.5rem'
                                }}
                              >
                                {subpage.name}
                              </Link>
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Popover>
                </Box>
              )}
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