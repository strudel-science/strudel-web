import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, IconButton, List, ListItem, Stack, Toolbar, Typography, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { StrudelPage } from '../types/strudel-config';
import { usePage } from '../hooks/usePage';
import { Sidebar, getSideBarItemStyles } from './Sidebar';
import { StaticImage } from 'gatsby-plugin-image';

interface PagesResult {
  configJson: {
    pages: StrudelPage[]
  },
  site: {
    pathPrefix?: string
  }
}

/**
 * Navbar and Sidebar to be used in smaller screens (less than 900px)
 * Incorporates a top bar with a menu icon that opens a sidebar overlay.
 */
export const MobileNav: React.FC = () => {
  const page = usePage();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showRootPages, setShowRootPages] = useState(page?.parent ? false : true);
  const [sidebarRootPage, setSidebarRootPage] = useState<StrudelPage>();
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

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  }

  const handleToggleTopLevelNav = () => {
    setShowRootPages(!showRootPages);
  }

  const handleTopLevelNavClick = (page: StrudelPage) => {
    setSidebarRootPage(page);
    setShowRootPages(false);
  }

  return (
    <Box>
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
            <IconButton
              color="neutral"
              size="large"
              onClick={handleToggleSidebar}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Link 
              to="/"
              style={{
                height: '100%',
                marginLeft: '-14px',
                position: 'absolute',
                left: '50vw',
                transform: 'translate(-50%, 0)',
              }}
            >
              <Stack 
                direction="row"
                sx={{
                  alignItems: 'center',
                  display: 'inline-flex',
                  height: '100%',
                }}
              >
                <StaticImage
                  alt="STRUDEL header logo"
                  loading="eager"
                  placeholder="none"
                  src="../../content/images/strudel-logo-icon.png"
                />
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  STRUDEL
                </Typography>
              </Stack>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          backgroundColor: 'info.main',
          borderRight: '1px solid',
          borderRightColor: 'neutral.main',
          height: '100%',
          left: showSidebar ? 0 : '-85vw',
          overflow: 'auto',
          position: 'fixed',
          top: 0,
          transition: '0.25s',
          width: '85vw',
          zIndex: 700,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'info.main', 
            borderRight: '1px solid',
            borderRightColor: 'neutral.main',
            height: '50px',
            padding: '0.5rem 1rem',
            position: 'absolute',
            top: 0,
            width: '100%',
            zIndex: 700,
          }}
        >
          <Stack 
            direction="row"
            sx={{
              alignItems: 'center',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            {showRootPages && (
              <Link
                to="/" 
                style={{
                  display: 'inline-block',
                  height: '100%',
                  marginLeft: '-1rem',
                }}
              >
                <Stack 
                  direction="row"
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex',
                    height: '100%',
                  }}
                >
                  <StaticImage
                    alt="STRUDEL header logo"
                    loading="eager"
                    placeholder="none"
                    src="../../content/images/strudel-logo-icon.png"
                  />
                  <Typography
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    STRUDEL
                  </Typography>
                </Stack>
              </Link>
            )}
            {!showRootPages && (
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<ArrowBackIcon />}
                onClick={handleToggleTopLevelNav}
              >
                Back
              </Button>  
            )}
            <IconButton 
              color="neutral"
              onClick={handleToggleSidebar}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </Box>
        {showRootPages && (
          <Box
            component="nav"
            sx={{ 
              backgroundColor: 'info.main', 
              borderRight: '1px solid',
              borderRightColor: 'neutral.main',
              color: 'secondary.main',
              height: '100%',
              left: 0,
              paddingTop: '3rem',
              position: 'absolute',
              top: 0,
              width: '100%',
              zIndex: 600,
            }}
          >
            <List>
              {pages.map((navbarPage, i) => (
                <ListItem 
                  key={`${navbarPage.name} ${i}`}
                  component="li"
                  sx={{
                    padding: 0,
                  }}
                >
                    <Box
                      sx={{
                        ...getSideBarItemStyles(navbarPage, currentPath),
                      }}
                    >
                      {navbarPage.children && (
                        <Button
                          endIcon={<ExpandMoreIcon sx={{ transform: 'rotate(270deg)' }} />}
                          onClick={() => handleTopLevelNavClick(navbarPage)}
                          sx={{
                            borderBottom: '1px solid',
                            borderBottomColor: 'secondary.dark',
                            borderRadius: 0,
                            borderTop: i === 0 ? '1px solid' : 'none',
                            borderTopColor: 'secondary.dark',
                            color: 'secondary.main',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '1rem',
                            fontWeight: 'normal',
                            padding: '0.5rem 1rem',
                            textAlign: 'left',
                            textTransform: 'none',
                            width: '100%',
                          }}
                        >
                          {navbarPage.name}
                        </Button>
                      )}
                      {!navbarPage.children && (
                        <Box
                          sx={{
                            borderBottom: '1px solid',
                            borderBottomColor: 'secondary.dark',
                            borderRadius: 0,
                            borderTop: i === 0 ? '1px solid' : 'none',
                            borderTopColor: 'secondary.dark',
                          }}
                        >
                          <Link
                            to={navbarPage.path}
                            style={{
                              display: 'block',
                              padding: '0.5rem 1rem',
                              width: '100%'
                            }}
                          >
                            {navbarPage.name}
                          </Link>
                        </Box>
                      )}
                    </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        {!showRootPages && (
          <Sidebar 
            rootPage={sidebarRootPage}
            component="div"
            sx={{
              borderRight: 'none',
              position: 'absolute',
              width: '100%', 
            }} 
          />
        )}
      </Box>
      </Box>
  )
};
